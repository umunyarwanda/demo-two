interface filterComomonParam {
  with_genres?: string | null,
  "sort_by"?: string | null,
  "with_original_language"?: string | null,
  include_adult?: boolean
}

export enum EFilterModes {
  MOVIES = "MOVIES",
  TV_SERIES = "TV_SERIES"
}

export interface IFilterMoviesReqDto extends filterComomonParam {
  primary_release_year?: number | null,
  "primary_release_date.lte"?: string | null,
  "release_date.gte" ?: string | null,
  "release_date.lte"?: string | null,
}

export interface IFilterTVSeriesReqDto extends filterComomonParam {
  first_air_date_year?: number | null,
  "first_air_date.lte"?: string | null,
  "air_date.gte" ?: string | null,
  "air_date.lte"?: string | null,
}