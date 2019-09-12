import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionsOfType } from '@martin_hotell/rex-tils';

import { SignUpApi } from '../../api/signup';

import { TSignUpActionObjectTypes } from './actions';
import { SignUpActionTypes } from './types';
import { ToasterActions } from '../toaster/actions';
import { wording } from '../../utils/wording';

function* subscribeNewsletterSaga(
  action: ActionsOfType<TSignUpActionObjectTypes, SignUpActionTypes.SUBSCRIBE_NEWSLETTER>
) {
  try {
    const { email } = action.payload;
    yield call(SignUpApi.subscribeNewsletter, { email });
    yield put(ToasterActions.showSuccessMessage(wording.subscriptionSuccessful));
  } catch (err) {
    yield put(ToasterActions.showErrorMessage(wording.basicError));
  }
}

export function* subscribeNewsletterWatcher() {
  yield takeEvery(SignUpActionTypes.SUBSCRIBE_NEWSLETTER, subscribeNewsletterSaga);
}
