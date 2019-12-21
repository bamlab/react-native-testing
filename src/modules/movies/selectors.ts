import { IAppState } from '../types';

export const movieListSelector = (state: IAppState) => state.movies.movieList;
