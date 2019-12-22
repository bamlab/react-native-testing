import { Reducer } from 'redux';

import { TTodoActionObjectTypes } from './actions';
import { ITodoState, TodoActionTypes } from './types';

const initialTodoState: ITodoState = {
  todoList: [],
};

export const todoReducer: Reducer<ITodoState, TTodoActionObjectTypes> = (
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
