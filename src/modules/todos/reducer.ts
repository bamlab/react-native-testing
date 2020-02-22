import { Reducer } from 'redux';

import { TTodoActionObjectTypes } from './actions';
import { TodoState, TodoActionTypes } from './types';

const initialTodoState: TodoState = {
  todoList: [],
};

export const todoReducer: Reducer<TodoState, TTodoActionObjectTypes> = (
  state = initialTodoState,
  action
) => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      return { ...state, todoList: [...state.todoList, action.payload.todo] };
    default:
      return state;
  }
};
