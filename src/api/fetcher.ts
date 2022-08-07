import { getLocalToken } from '../utils/authUtils';

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';
const BASE_URL = 'http://localhost:8080/';

export const fetcher = async (endPoint: string, method: Method, body?: {}) => {
  try {
    const option = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getLocalToken() || '',
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
    console.error(`
    에러가 발생한 End Point : 🎬 ${endPoint} 🔚
    에러 내용 : 🎬 ${error} 🔚
    `);
  }
};
