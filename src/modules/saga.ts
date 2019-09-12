import { all } from 'redux-saga/effects';

import { subscribeNewsletterWatcher } from './signup/sagas';

function* watchAll() {
  yield all([subscribeNewsletterWatcher()]);
}

export default watchAll;
