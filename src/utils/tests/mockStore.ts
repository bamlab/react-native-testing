import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../../modules/reducer';
import { IAppState } from '../../modules/types';

export const sagaMiddlewareTest = createSagaMiddleware();
export const createInitialiasedStore = (initialState?: Partial<IAppState>) =>
  createStore(rootReducer, initialState, applyMiddleware(sagaMiddlewareTest));
