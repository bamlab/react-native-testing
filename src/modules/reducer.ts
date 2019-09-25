import {ReducersMapObject, combineReducers} from 'redux';

import {IAppState} from './types';
import {signupReducer} from './signup/reducer';
import {toasterReducer} from './toaster/reducer';
import {todoReducer} from './todos/reducer';

const reducers: ReducersMapObject = {
  //@ts-ignore
  signup: signupReducer,
  //@ts-ignore
  toaster: toasterReducer,
  //@ts-ignore
  todos: todoReducer,
};

export const rootReducer = combineReducers<IAppState>(reducers);
