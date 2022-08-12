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

    // const consoleLogStatus = (status: number, statusText: string) => {
    //   const splitedUrl = url.split('/');
    //   console.log(`
    //     end point : ${splitedUrl[splitedUrl.length - 1]}
    //     status code : ${status}
    //     statusText : ${statusText}
    //   `);
    // };

    const response = await fetch(url, option);
    if (response.status) {
      // 상태 처리
      // consoleLogStatus(response.status, response.statusText);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`
    에러가 발생한 End Point : 🎬 ${url} 🔚
    에러 내용 : 🎬 ${error} 🔚
    `);
  }
}
