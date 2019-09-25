import {put, takeEvery, delay} from 'redux-saga/effects';
import {ActionsOfType} from '@martin_hotell/rex-tils';

import {MoviesActionTypes} from './types';
import {TMoviesActionObjectTypes, MoviesActions} from './actions';
import {addLoader} from '../loading/sagas';
import {LoaderName} from '../loading/types';

function* getMoviesSaga(
  action: ActionsOfType<TMoviesActionObjectTypes, MoviesActionTypes.GET_MOVIES>,
) {
  try {
    yield delay(2000); // fake API call
    const fakeMoviesFromAPI = ['Interstellar', 'Vendeta', 'Star Wars'];
    yield put(MoviesActions.getMoviesSuccess(fakeMoviesFromAPI));
  } catch (err) {
    console.log(err);
  }
}

export function* getMoviesWatcher() {
  yield takeEvery(
    MoviesActionTypes.GET_MOVIES,
    addLoader(getMoviesSaga, LoaderName.Movies),
  );
}
