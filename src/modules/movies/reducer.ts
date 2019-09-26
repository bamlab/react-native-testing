import {Reducer} from 'redux';

import {TMoviesActionObjectTypes} from './actions';
import {IMoviesState, MoviesActionTypes} from './types';

const initialMoviesState: IMoviesState = {
  movieList: undefined,
};

export const moviesReducer: Reducer<IMoviesState, TMoviesActionObjectTypes> = (
  state = initialMoviesState,
  action,
) => {
  switch (action.type) {
    case MoviesActionTypes.GET_MOVIES_SUCCESS:
      return {...state, movieList: action.payload.movies};
    default:
      return state;
  }
};
