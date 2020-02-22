import { ToasterState } from './toaster/types';
import { TodoState } from './todos/types';
import { MoviesState } from './movies/types';
import { LoadingState } from './loading/types';

export interface AppState {
  signup: {};
  toaster: ToasterState;
  todos: TodoState;
  movies: MoviesState;
  loading: LoadingState;
}
