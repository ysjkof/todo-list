import { getUserToken } from '../services/authServices';

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';

export async function fetcher<T>(
  url: string,
  method: Method,
  body?: {}
): Promise<T> {
  const option = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getUserToken() || '',
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(url, option);

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      // 400은 에러가 아니고 거절 응답이 온 상태다
      // 사용자에게 알림을 줘야 한다
      // 사용자에게 알림을 주려면 response에 details를 전달해야 한다
      // 페처를 교체 가능성 높은 모듈이다.
      // 400 응답은 내용이 바뀔 가능성이 있다.
      // 여기서는 최소한의 작업만 하자.
      // 에러 처리는 컨트롤러에서 실패메시지인 details로 처리하자
      // 페치모듈에서 안하는 이유
      // 페치모듈은 반환하는 데이터 형태를 자동완성하지 못하고 있다.
      // 컨트롤러에서 자동완성이 작동하기 때문에 거기서 하는게 코드 파악하기 좋다.
    }
    if (response.status >= 500) {
      throw new Error(`
      response status: ${response.status}
      statusText: ${response.statusText}
      `);
    }
  }

  const result = await response.json();
  return result;
}
