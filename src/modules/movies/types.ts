export enum MoviesActionTypes {
  GET_MOVIES = 'GET_MOVIES',
  GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS',
}

export interface IMoviesState {
  movieList?: string[];
}
