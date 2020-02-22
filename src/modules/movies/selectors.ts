import { AppState } from '../types';

export const movieListSelector = (state: AppState) => state.movies.movieList;
