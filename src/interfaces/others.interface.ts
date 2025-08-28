import { IMovieImage, IMovieSummaryDto, ITvSummaryDto } from "./movie.interface";

export interface ICollectionDetailDto {
  id: number,
  name: string,
  poster_path: string | null,
  backdrop_path: string | null,
  overview: string | null,
  parts: IMovieSummaryDto[],
  images: {
    posters: IMovieImage[],
    backdrops: IMovieImage[]
  }
}