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

const loginMutation = async ({
  email,
  password,
}: LoginInputDto): Promise<LoginOutputDto> => {
  const { details, token, message } = await userFetch.post<LoginInputDto>(
    'login',
    {
      email,
      password,
    }
  );

  if (!token) {
    throw new Error('token이 없습니다. : ' + details);
  }

  return {
    ok: true,
    token: token,
  };
};

const signUpMutation = async ({
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
    throw new Error('token이 없습니다. : ' + details);
  }

  return {
    ok: true,
    token: token,
  };
};

export default {
  loginMutation,
  signUpMutation,
};
