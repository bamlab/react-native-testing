import {movieDbToken} from './apiTokens';

export const EMAIL_API_ENDPOINT =
  'https://fake-newsletter.herokuapp.com/user/subscribe'; // can be pretty slow :/

export const MOVIES_API_ENDPOINT =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' +
  movieDbToken;
