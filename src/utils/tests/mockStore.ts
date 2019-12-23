import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../../modules/reducer';
import { AppState } from '../../modules/types';

export const sagaMiddlewareTest = createSagaMiddleware();
export const createInitialiasedStore = (initialState?: Partial<AppState>) =>
  createStore(rootReducer, initialState, applyMiddleware(sagaMiddlewareTest));
