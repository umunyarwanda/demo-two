import { IGetAccountStatesResDto } from "./user.interface";

export enum EVideoType {
  Featurette = "Featurette",
  Trailer = "Trailer",
  Teaser = "Teaser",
  Clip = "Clip",
  OpeningCredits = "Opening Credits",
}

export enum EVideoSite {
  YouTube = "YouTube",
  Vimeo = "Vimeo",
  Dailymotion = "Dailymotion",
  Facebook = "Facebook",
  Instagram = "Instagram",
}

export interface IVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: EVideoSite;
  size: number;
  type: EVideoType;
  official: boolean;
  published_at: string;
}

export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ICrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface IKeyword {
  id: number;
  name: string;
}

export interface ICastCredits {
  cast: ICast[];
  crew: ICrew[];
}

export interface IMovieImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface IMovieReview {
  author: string,
  author_details: {
    name: string,
    username: string,
    avatar_path: null | string,
    rating: number
  },
  content: string,
  created_at: Date,
  id: string,
  updated_at: Date,
  url: string
}

interface ICommonMovieInfoDto {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv";
  adult: boolean;
  original_language: string;
  genre_ids?: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  rating?: number | null;
  images: {
    backdrops: IMovieImage[];
    posters: IMovieImage[];
  },
  reviews: {
    page: number,
    results: IMovieReview[],
    total_pages: number,
    total_results: number
  }
}

export interface IMovieSummaryDto extends ICommonMovieInfoDto {
  original_title: string;
  release_date: string; // "YYYY-MM-DD"
  title: string;
  video: boolean;
}

export interface ITvSummaryDto extends ICommonMovieInfoDto {
  name: string;
  original_name: string;
  first_air_date: string; // "YYYY-MM-DD"
  origin_country: string[];
}

export interface ITvEpisodeSummaryDto {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  rating?: number | null;
}

export interface ICastSummaryDto {
  id: number,
  name: string,
  original_name: string,
  media_type: "person",
  adult: false,
  popularity: number,
  gender: number,
  known_for_department: string,
  profile_path: string,
}

export interface ICollectionSummaryDto {
  id: number,
  name: string,
  title: string,
  original_name: string,
  media_type: "collection",
  adult: boolean,
  original_language: string,
  poster_path: string,
  backdrop_path: string,
  overview: string,
}

export interface IMovieDetailsDto extends IMovieSummaryDto {
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  }
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage?: string;
  imdb_id?: string;
  production_companies?: {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  recommendations?: {
    page: number;
    results: IMovieSummaryDto[];
    total_pages: number;
    total_results: number;
  };
  similar?: {
    page: number;
    results: IMovieSummaryDto[];
    total_pages: number;
    total_results: number;
  };
  runtime?: number;
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline?: string;
  external_ids?: {
    imdb_id?: string;
    wikidata_id?: string;
    facebook_id?: string;
    instagram_id?: string;
    twitter_id?: string;
  },
  videos?: {
    results: IVideo[];
  },
  keywords: {
    keywords: IKeyword[];
  };
  credits?: ICastCredits,
  account_states?: IGetAccountStatesResDto | null
}

export interface ITvDetailsDto extends ITvSummaryDto {
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  }
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage?: string;
  imdb_id?: string;
  production_companies?: {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  recommendations?: {
    page: number;
    results: IMovieSummaryDto[];
    total_pages: number;
    total_results: number;
  };
  similar?: {
    page: number;
    results: IMovieSummaryDto[];
    total_pages: number;
    total_results: number;
  };
  runtime?: number;
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline?: string;
  external_ids?: {
    imdb_id?: string;
    wikidata_id?: string;
    facebook_id?: string;
    instagram_id?: string;
    twitter_id?: string;
  },
  videos?: {
    results: IVideo[];
  },
  keywords: {
    results: IKeyword[];
  },
  credits?: ICastCredits,
  created_by?: {
    id: number;
    credit_id: string;
    gender: number;
    name: string;
    original_name: string;
    profile_path: string;
  }[],
  episode_run_time?: number[],
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  }
  next_episode_to_air: null | {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string;
  }
  networks: {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[]
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[]
  type: string;
  account_states?: IGetAccountStatesResDto | null
}

export interface ITvSeasonDetailsDto {
  _id: string,
  air_date: string,
  name: string,
  overview: string,
  id: number,
  poster_path: string,
  season_number: number,
  vote_average: number,
  images: {
    posters: IMovieImage[]
  },
  videos: {
    results: IVideo[]
  },
  credits: {
    cast: ICast[],
    crew: ICrew[]
  },
  external_ids: {
    freebase_mid: string,
    freebase_id: string,
    tvdb_id: number,
    tvrage_id: string,
    wikidata_id: string
  },
  episodes: {
    air_date: string,
    episode_number: number,
    episode_type: string,
    id: number,
    name: string,
    overview: string,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string,
    vote_average: number,
    vote_count: number,
    crew: ICrew[],
    guest_stars: ICast[]
  }[]
}

export interface ITvSeasonEpisodeDetailsDto {
  air_date: string,
  crew: ICrew[],
  episode_number: number,
  episode_type: string,
  guest_stars: ICast[],
  id: number,
  name: string,
  overview: string,
  production_code: string,
  runtime: number,
  season_number: number,
  still_path: string,
  credits: {
    cast: ICast[],
    crew: ICrew[],
    guest_stars: ICast[]
  },
  videos: {
    results: IVideo[]
  },
  images: {
    stills: IMovieImage[]
  }
}
