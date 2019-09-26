import wretch from 'wretch';

import {MOVIES_API_ENDPOINT} from '../config';

export class MoviesApi {
  public static getMovies() {
    return wretch()
      .url(MOVIES_API_ENDPOINT)
      .get()
      .json(res => res.data);
  }
}
