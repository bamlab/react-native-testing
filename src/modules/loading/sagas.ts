import { call, put } from 'redux-saga/effects';

import { LoadingActions } from './actions';
import { LoaderName } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addLoader = (saga: (...args: any[]) => any, loaderName: LoaderName) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function*(...args: any[]): any {
    try {
      yield put(LoadingActions.showLoader(loaderName));
      const result = yield call(saga, ...args);

      return result;
    } finally {
      yield put(LoadingActions.hideLoader(loaderName));
    }
  };
