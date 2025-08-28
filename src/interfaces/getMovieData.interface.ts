import { IMovieSummaryDto, ITvSummaryDto } from "./movie.interface";

export interface IGetPopularMoviesResDto {
  page: number;
  results: IMovieSummaryDto[];
  total_pages: number;
  total_results: number;
}

export interface IGetPopularTvResDto {
  page: number;
  results: ITvSummaryDto[];
  total_pages: number;
  total_results: number;
}

export interface IGetFilteredResultResDto {
  page: number;
  results: ITvSummaryDto[] | ITvSummaryDto[];
  total_pages: number;
  total_results: number;
}

export interface IGetSearchResultResDto {
  page: number;
  results: ITvSummaryDto[] | ITvSummaryDto[];
  total_pages: number;
  total_results: number;
}

export interface IGetHomepageDataResDto {
  dailyTrendingMovies: IGetPopularMoviesResDto;
  weeklyTrendingMovies: IGetPopularMoviesResDto;
  dailyTrendingTv: IGetPopularTvResDto;
  weeklyTrendingTv: IGetPopularTvResDto;
}

export interface IGetTrendingMoviesResDto extends IGetPopularMoviesResDto {}

export interface IGetTrendingTvResDto extends IGetPopularTvResDto {}
