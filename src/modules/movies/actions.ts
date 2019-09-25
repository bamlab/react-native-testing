import {ActionsUnion, createAction} from '@martin_hotell/rex-tils';

import {MoviesActionTypes} from './types';

export const MoviesActions = {
  getMovies: () => createAction(MoviesActionTypes.GET_MOVIES),
  getMoviesSuccess: (movies: string[]) =>
    createAction(MoviesActionTypes.GET_MOVIES_SUCCESS, {movies}),
};

export type TMoviesActionObjectTypes = ActionsUnion<typeof MoviesActions>;
