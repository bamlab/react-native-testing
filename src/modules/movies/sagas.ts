import { put, takeEvery, delay, call, all } from 'redux-saga/effects';
import { ActionsOfType } from '@martin_hotell/rex-tils';

import { MoviesActionTypes } from './types';
import { TMoviesActionObjectTypes, MoviesActions } from './actions';
import { addLoader } from '../loading/sagas';
import { LoaderName } from '../loading/types';
import { MoviesApi } from '../../api/movies';

function* getMoviesSaga(
  action: ActionsOfType<TMoviesActionObjectTypes, MoviesActionTypes.GET_MOVIES>
) {
  try {
    const [movies] = yield all([call(MoviesApi.getMovies), delay(2000)]);
    // delay is used here for testing purposes to demonstrate how to use jest timers
    const movieTitles = movies.results.map(movie => movie.title);
    yield put(MoviesActions.getMoviesSuccess(movieTitles));
  } catch (err) {
    console.log(err);
  }
}

export function* getMoviesWatcher() {
  yield takeEvery(MoviesActionTypes.GET_MOVIES, addLoader(getMoviesSaga, LoaderName.Movies));
}
