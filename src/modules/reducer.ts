import { ReducersMapObject, combineReducers } from 'redux';

import { IAppState } from './types';
import { signupReducer } from './signup/reducer';
import { toasterReducer } from './toaster/reducer';

const reducers: ReducersMapObject = {
  //@ts-ignore
  signup: signupReducer,
  //@ts-ignore
  toaster: toasterReducer,
};

export const rootReducer = combineReducers<IAppState>(reducers);
