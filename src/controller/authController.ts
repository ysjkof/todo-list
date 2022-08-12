import FetchData from '../api/fetchData';
import { fetcher } from '../api/fetcher';
import {
  LoginInputDto,
  LoginOutputDto,
  SignUpInputDto,
  SignUpOutputDto,
} from '../types/dtos/authDto';

interface UserFetchDataOutput {
  token?: string;
  details?: string;
  message?: string;
}

const USER_URL = 'http://localhost:8080/users';
const userRepository = new FetchData<UserFetchDataOutput>(USER_URL, fetcher);

export const loginMutation = async ({
  email,
  password,
}: LoginInputDto): Promise<LoginOutputDto> => {
  const { token, details, message } = await userRepository.post<LoginInputDto>(
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
  const { token, details, message } = await userRepository.post<SignUpInputDto>(
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
