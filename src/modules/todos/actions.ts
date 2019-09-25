import {ActionsUnion, createAction} from '@martin_hotell/rex-tils';

import {TodoActionTypes} from './types';

export const TodoActions = {
  addTodo: (todo: string) => createAction(TodoActionTypes.ADD_TODO, {todo}),
};

export type TTodoActionObjectTypes = ActionsUnion<typeof TodoActions>;
