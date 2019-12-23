import { ReducersMapObject, combineReducers } from 'redux';

import { AppState } from './types';
import { signupReducer } from './signup/reducer';
import { toasterReducer } from './toaster/reducer';
import { todoReducer } from './todos/reducer';
import { moviesReducer } from './movies/reducer';
import { loadingReducer } from './loading/reducer';

// TODO: fix typing
const reducers: ReducersMapObject = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  signup: signupReducer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  toaster: toasterReducer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  todos: todoReducer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  movies: moviesReducer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  loading: loadingReducer,
};

export const rootReducer = combineReducers<AppState>(reducers);
