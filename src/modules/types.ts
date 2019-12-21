import { ISignupState } from './signup/types';
import { IToasterState } from './toaster/types';
import { ITodoState } from './todos/types';
import { IMoviesState } from './movies/types';

export interface IAppState {
  signup: ISignupState;
  toaster: IToasterState;
  todos: ITodoState;
  movies: IMoviesState;
}
