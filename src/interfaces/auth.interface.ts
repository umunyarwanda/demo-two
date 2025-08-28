export interface IGenerateRequestTokenResDto {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface IGenerateRequestTokenResDtoV4 {
  success: boolean;
  status_code: number;
  status_message: string;
  request_token: string;
}

export interface IGenerateAccessTokenResDtoV4 {
  success: boolean;
  status_code: number;
  status_message: string;
  account_id: number;
  access_token: string;
}

export interface ICreateSessionResDto {
  success: boolean;
  session_id: string;
}

export interface IGetAccountDetailsResDto {
  avatar: {
    gravatar: {
      hash: string;
    },
    tmdb: {
      avatar_path: string;
    }
  },
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface ILocalUser {
  accountId: number;
  username: string;
  name: string;
  country: string;
  avatar: string;
  sessionId: string;

  // V4
  accessToken: string;
  accountIdV4: number;
}