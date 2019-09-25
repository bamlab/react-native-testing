import {IAppState} from '../types';

export const todoListSelector = (state: IAppState) => state.todos.todoList;
