interface LoginFetcher {
  email: string;
  password: string;
}
interface LoginOutput {
  message: string;
  token?: string;
  error?: unknown;
}
export const loginFetcher = async ({
  email,
  password,
}: LoginFetcher): Promise<LoginOutput> => {
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

interface SignUpFetcher extends LoginFetcher {}

export const signUpFetcher = async ({ email, password }: SignUpFetcher) => {
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
