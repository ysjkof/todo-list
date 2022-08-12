import FetchModule from '../api/fetchModule';
import { fetcher } from '../api/fetcher';
import {
  LoginInputDto,
  LoginOutputDto,
  SignUpInputDto,
  SignUpOutputDto,
} from '../types/dtos/authDto';

interface UserFetchResponse {
  token?: string;
  details?: string;
  message?: string;
}

const USER_URL = 'http://localhost:8080/users';
const userFetch = new FetchModule<UserFetchResponse>(USER_URL, fetcher);

export const loginMutation = async ({
  email,
  password,
}: LoginInputDto): Promise<LoginOutputDto> => {
  const { token, details, message } = await userFetch.post<LoginInputDto>(
    'login',
    {
      email,
      password,
    }
  );

  if (!token) {
    return { ok: false, message: message || details || '' };
  }

  return {
    ok: true,
    token: token,
  };
};

export const signUpMutation = async ({
  email,
  password,
}: SignUpInputDto): Promise<SignUpOutputDto> => {
  const { token, details, message } = await userFetch.post<SignUpInputDto>(
    'create',
    {
      email,
      password,
    }
  );

  if (!token) {
    return { ok: false, message: message || details || '' };
  }

  return {
    ok: true,
    token: token,
  };
};
