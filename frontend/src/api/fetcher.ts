import { getUserToken } from '../services/authServices';
import { createError, getEndPoint } from '../utils/utils';

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';

export async function fetcher<T>(
  url: string,
  method: Method,
  body?: {}
): Promise<T> {
  try {
    const option = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getUserToken() || '',
      },
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(url, option);
    if (response.status) {
      // 상태 처리
    }
    const result = await response.json();

    return result;
  } catch (error) {
    throw createError({
      filename: 'fetcher.ts',
      endpoint: getEndPoint(url),
      error,
    });
  }
}
