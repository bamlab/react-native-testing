import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducer';
import watchAll from './saga';

export const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchAll);
