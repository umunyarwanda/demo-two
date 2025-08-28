const TMDB_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_API_ACCESS_TOKEN;
const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_BASE_URL_V4 = 'https://api.themoviedb.org/4';
const TMDB_BASE_URL = 'https://www.themoviedb.org';
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const LOCAL_USER_KEY = 'MOOVI_LOCAL_USER';

// TMDB ENDPOINTS
const TMDB_ENDPOINTS = {
  // Movies
  POPULAR_MOVIES: '/movie/popular',
  TRENDING_MOVIES: '/trending/movie',
  MOVIE_DETAIL: '/movie',
  DISCOVER_MOVIES: '/discover/movie',
  
  // TV
  POPULAR_TV: '/tv/popular',
  TRENDING_TV: '/trending/tv',
  TV_DETAIL: '/tv',
  DISCOVER_TV: '/discover/tv',
  TV_SEASON_DETAIL: '/season',
  TV_SEASON_EPISODE_DETAIL: '/episode',

  // CAST
  CAST_DETAIL: '/person',

  // All
  ALL_TRENDING: '/trending/all',
  SEARCH_ALL: '/search/multi',
  SEARCH_COLLECTION: '/search/collection',
  SEARCH_MOVIE: '/search/movie',
  SEARCH_PERSON: '/search/person',
  SEARCH_TV: '/search/tv',
  SEARCH_COMPANY: '/search/company',
  SEARCH_KEYWORD: '/search/keyword',

  // COLLECTION
  COLLECTION_DETAIL: '/collection',

  // Auth
  AUTH_SIGNUP: '/signup',
  AUTH_REQUEST_TOKEN: '/authentication/token/new',
  AUTH_AUTHENTICATE_REQUEST_TOKEN: '/authenticate',
  AUTH_CREATE_SESSION: '/authentication/session/new',
  AUTH_ACCOUNT_DETAILS: '/account',
  AUTH_EDIT_ACCOUNT_SETTINGS: '/settings/profile',

  // Auth - V4
  AUTH_REQUEST_TOKEN_V4: '/auth/request_token',
  AUTH_AUTHENTICATE_REQUEST_TOKEN_V4: '/auth/access',
  AUTH_GET_ACCESS_TOKEN_V4: '/auth/access_token',
  AUTH_CREATE_SESSION_FROM_V4: '/authentication/session/convert/4',

  // WATCHLIST
  GET_WATCHLIST_MOVIES: '/watchlist/movies',
  GET_WATCHLIST_TV: '/watchlist/tv',
  REMOVE_WATCHLIST: '/watchlist',

  // FAVORITES
  GET_FAVORITES_MOVIES: '/favorite/movies',
  REMOVE_FAVORITES_MOVIE: '/favorite',
  GET_FAVORITES_TV: '/favorite/tv',
  REMOVE_FAVORITES_TV: '/favorite/tv',

  // RATED
  GET_RATED_MOVIES: '/rated/movies',
  GET_RATED_TV: '/rated/tv',
  GET_RATED_EPISODES: '/rated/tv/episodes',

  // LISTS V4
  GET_ACCOUNT_ENDPOINT: '/account/',
  GET_LISTS_V4_POSTFIX: '/lists',
  SINGLE_LIST_V4_POSTFIX: '/list',
  LIST_ITEMS_V4_POSTFIX: '/items',
  CLEAR_LIST_V4_POSTFIX: '/clear',

  // RATE
  RATE: '/rating',

  // ACCOUNT STATES
  GET_ACCOUNT_STATES: '/account_states',
}

const TMDB_IMAGE_QUALITY = {
  ORIGINAL: 'original',
  POSTER_SIZES: {
    W_92: 'w92',
    W_154: 'w154',
    W_185: 'w185',
    W_342: 'w342',
    W_500: 'w500',
    W_780: 'w780',
  },
  BACKDROP_SIZES: {
    W_300: 'w300',
    W_780: 'w780',
    W_1280: 'w1280',
  },
  LOGO_SIZES: {
    W_45: 'w45',
    W_92: 'w92',
    W_154: 'w154',
    W_185: 'w185',
    W_300: 'w300',
    W_500: 'w500',
  },
  PROFILE_SIZES: {
    W_45: 'w45',
    W_185: 'w185',
    H_632: 'h632',
  },
  STILL_SIZES: {
    W_92: 'w92',
    W_185: 'w185',
    W_300: 'w300',
  }
}

export {
  TMDB_ACCESS_TOKEN,
  TMDB_API_KEY,
  TMDB_API_BASE_URL,
  TMDB_API_BASE_URL_V4,
  TMDB_ENDPOINTS,
  TMDB_IMAGE_URL,
  TMDB_BASE_URL,
  LOCAL_USER_KEY,
  TMDB_IMAGE_QUALITY
}

