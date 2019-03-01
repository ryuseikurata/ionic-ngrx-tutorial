import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { TodoService } from 'src/app/core/services/todo.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Todo } from './todo.model';

@Injectable()
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private todoService: TodoService
    ) {}
    @Effect()
    getAllTodos$: Observable<Action> = this.actions$.pipe(
        ofType(TodoActions.GET_ALL_TODOS),
        switchMap(() => this.todoService.getTodos()),
        map((todos: Todo[]) => new TodoActions.GetAllTodosSuccess(todos)),
        catchError(err => of(new TodoActions.GetAllTodosFail(err)))
    );

    @Effect()
    getTodoById$: Observable<Action> = this.actions$.pipe(
        ofType(TodoActions.GET_TODO),
        map((action: TodoActions.GetTodo) => action.payload),
        switchMap((id) => this.todoService.getTodo(id)),
        map((todo: Todo) => new TodoActions.GetTodoSuccess(todo)),
        catchError(err => of(new TodoActions.GetTodoFail(err)))
    );

}
