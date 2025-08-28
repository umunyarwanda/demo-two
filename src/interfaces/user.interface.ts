import { IMovieSummaryDto, ITvEpisodeSummaryDto, ITvSummaryDto } from "./movie.interface";

export interface IGetMovieUserResDto {
  page: number;
  results: IMovieSummaryDto[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvUserResDto {
  page: number;
  results: ITvSummaryDto[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvEpisodesUSerResDto {
  page: number;
  results: ITvEpisodeSummaryDto[];
  total_pages: number;
  total_results: number;
}

export interface IGetAccountStatesResDto {
  id: number;
  favorite: boolean;
  rated: boolean | {
    value: number;
  };
  watchlist: boolean;
}

// LISTS
export interface IListDto {
  account_object_id: string;
  adult: number;
  average_rating: number;
  backdrop_path: string;
  created_at: string;
  description: string;
  featured: number;
  id: number;
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  number_of_items: number;
  poster_path: string | null;
  public: number ;
  revenue: number;
  runtime: string;
  sort_by: number;
  updated_at: string;
}
export interface IGetListsResDto {
  page: number;
  results: IListDto[];
  total_pages: number;
  total_results: number;
}

export interface ICreateListDto {
  iso_639_1: string;
  name: string;
  description: string;
  public: boolean | string; // 1 for true, 0 for false
  show_comments: string; // 1 for true, 0 for false
  sort_by: string;
  backdrop_path: string | null;
}

export interface IGetListResDto {
  average_rating: number;
  backdrop_path: string;
  results: (IMovieSummaryDto | ITvSummaryDto)[];
  comments: {
    [key: string]: string | null;
  };
  created_by: {
    avatar_path: string | null;
    gravatar_hash: string;
    id: string;
    name: string;
    username: string;
  };
  description: string;
  id: number;
  iso_3166_1: string;
  iso_639_1: string;
  item_count: number;
  name: string;
  object_ids: {
    [key: string]: string | null;
  };
  page: number;
  poster_path: string | null;
  public: boolean;
  revenue: number;
  runtime: number;
  sort_by: string;
  total_pages: number;
  total_results: number;
}

export interface IAddRemoveListItemsDto {
  items: {
    media_type: string;
    media_id: number;
  }[];
}

export interface IAddRemoveListItemsResDto {
  success: boolean;
  results: {
    media_type: string;
    media_id: number;
  }
}