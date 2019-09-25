import {all} from 'redux-saga/effects';

import {subscribeNewsletterWatcher} from './signup/sagas';
import {getMoviesWatcher} from './movies/sagas';

function* watchAll() {
  yield all([subscribeNewsletterWatcher(), getMoviesWatcher()]);
}

export default watchAll;
