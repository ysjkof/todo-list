import { getUserToken } from '../services/authServices';

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';
const BASE_URL = 'http://localhost:8080/';

export async function fetcher<T>(
  endPoint: string,
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
    const response = await fetch(`${BASE_URL}${endPoint}`, option);
    if (response.status) {
      console.log(`
        end point : ${endPoint}
        status code : ${response.status}
        statusText : ${response.statusText}
        `);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`
    에러가 발생한 End Point : 🎬 ${endPoint} 🔚
    에러 내용 : 🎬 ${error} 🔚
    `);
  }
}
