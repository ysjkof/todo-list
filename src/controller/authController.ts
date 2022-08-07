import {
  LoginInputDto,
  LoginOutputDto,
  SignUpInputDto,
} from '../types/authType';

export const loginFetcher = async ({
  email,
  password,
}: LoginInputDto): Promise<LoginOutputDto> => {
  try {
    const response = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();

    return {
      message: result.message || result.details || '',
      token: result?.token,
    };
  } catch (error) {
    return { message: '에러 발생 :', error };
  }
};

export const signUpFetcher = async ({ email, password }: SignUpInputDto) => {
  try {
    const response = await fetch('http://localhost:8080/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();

    return {
      message: result.message || result.details || '',
      token: result?.token,
    };
  } catch (error) {
    return { message: '에러 발생 :', error };
  }
};
