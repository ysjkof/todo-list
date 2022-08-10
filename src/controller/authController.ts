import { fetcher } from '../api/fetcher';
import {
  LoginInputDto,
  LoginOutputDto,
  SignUpInputDto,
} from '../types/dtos/authDto';

export const loginQuery = async ({
  email,
  password,
}: LoginInputDto): Promise<LoginOutputDto> => {
  const result = await fetcher('users/login', 'POST', { email, password });

  return {
    message: result?.message || result?.details || '',
    token: result?.token,
  };
};

export const signUpQuery = async ({ email, password }: SignUpInputDto) => {
  const result = await fetcher('users/create', 'POST', { email, password });
  return {
    message: result?.message || result?.details || '',
    token: result?.token,
  };
};
