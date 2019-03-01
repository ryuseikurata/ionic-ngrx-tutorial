import * as fromTodo from './todo/todo.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    todo: fromTodo.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    todo: fromTodo.reducer
};
