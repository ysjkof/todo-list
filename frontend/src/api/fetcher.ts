import { getUserToken } from '../services/authServices';

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
    const getEndPoint = (thisUrl: string) => {
      const splitedUrl = thisUrl.split('/');
      return splitedUrl[splitedUrl.length - 1];
    };
    throw new Error(`
    fetch에 문제가 있습니다.
    에러가 발생한 End Point : 🎬 ${getEndPoint(url)} 🔚
    에러 내용 : 🎬 ${error} 🔚
    `);
  }
}
