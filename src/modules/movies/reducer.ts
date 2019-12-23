import { Reducer } from 'redux';

import { TMoviesActionObjectTypes } from './actions';
import { MoviesState, MoviesActionTypes } from './types';

const initialMoviesState: MoviesState = {
  movieList: undefined,
};

export const moviesReducer: Reducer<MoviesState, TMoviesActionObjectTypes> = (
  state = initialMoviesState,
  action
) => {
  switch (action.type) {
    case MoviesActionTypes.GET_MOVIES_SUCCESS:
      return { ...state, movieList: action.payload.movies };
    default:
      return state;
  }
};
