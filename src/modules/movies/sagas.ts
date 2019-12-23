import { put, takeEvery, delay, call, all } from 'redux-saga/effects';

import { MoviesActionTypes } from './types';
import { MoviesActions } from './actions';
import { addLoader } from '../loading/sagas';
import { LoaderName } from '../loading/types';
import { MoviesApi } from '../../api/movies';

function* getMoviesSaga() {
  try {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const [movies] = yield all([call(MoviesApi.getMovies), delay(2000)]);
    // delay is used here for testing purposes to demonstrate how to use jest timers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const movieTitles = movies.results.map((movie: any) => movie.title);
    yield put(MoviesActions.getMoviesSuccess(movieTitles));
  } catch (err) {
    console.log(err);
  }
}

export function* getMoviesWatcher() {
  yield takeEvery(MoviesActionTypes.GET_MOVIES, addLoader(getMoviesSaga, LoaderName.Movies));
}
