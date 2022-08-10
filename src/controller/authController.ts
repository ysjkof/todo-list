import { fetcher } from '../api/fetcher';
import {
  LoginInputDto,
  LoginOutputDto,
  SignUpInputDto,
  SignUpOutputDto,
} from '../types/dtos/authDto';

export const loginMutation = async ({
  email,
  password,
}: LoginInputDto): Promise<LoginOutputDto> => {
  const result = await fetcher<LoginOutputDto>('users/login', 'POST', {
    email,
    password,
  });
  return {
    message: result?.message || result?.details || '',
    token: result?.token,
    error: result?.error,
  };
};

export const signUpMutation = async ({ email, password }: SignUpInputDto) => {
  const result = await fetcher<SignUpOutputDto>('users/create', 'POST', {
    email,
    password,
  });
  return {
    message: result?.message || result?.details || '',
    token: result?.token,
  };
};
