import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Todo } from 'src/app/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todourl = 'api/todos';

  constructor(
    private http: HttpClient
  ) { }

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todourl);
  }

  public getTodo(id: number): Observable<Todo> {
    return this.getTodos().pipe(
      map(todos => todos.find(todo => todo.id === id))
    );
  }

  public save(todo: Todo): Observable<Todo> {
    if (todo.id) {
      return this.put(todo);
    }
    return this.post(todo);
  }

  public delete(todo: Todo): Observable<Todo> {
    const url = `${this.todourl}/${todo.id}`;
    return this.http.delete<void>(url).pipe(
      switchMap(() => of(todo))
    );
  }

  private post(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todourl, todo);
  }

  private put(todo: Todo): Observable<Todo> {
    const url = `${this.todourl}/${todo.id}`;
    return this.http.put<Todo>(url, todo).pipe(
      switchMap(() => of(todo))
    );
  }
}
