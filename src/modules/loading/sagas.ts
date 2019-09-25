import { call, put } from 'redux-saga/effects';

import { LoadingActions } from './actions';
import { LoaderName } from './types';

export const addLoader = (saga: (...args: any[]) => any, loaderName: LoaderName) =>
  function*(...args: any[]): any {
    try {
      yield put(LoadingActions.showLoader(loaderName));
      const result = yield call(saga, ...args);

      return result;
    } catch (error) {
      throw error;
    } finally {
      yield put(LoadingActions.hideLoader(loaderName));
    }
  };
