import { AppState } from '../types';

export const todoListSelector = (state: AppState) => state.todos.todoList;
