/**
 * @param rest 클래스네임을 `,(쉼표)`로 구분해서 입력
 * @returns rest를 하나의 문자열로 하고 쉼표를 공백문자로 바꿔서 반환
 */
export const cls = (...rest: string[]) => rest.join(' ');

/**
 * @param index 삭제할 값의 인덱스
 * @param array 삭제할 값이 있는 배열
 * @returns 인덱스가 삭제된 배열
 */
export function removeItemInArrayByIndex<T>(index: number, array: T[]) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

/**
 * @param array 전체 배열
 * @param value 객체에 삽입할 새로운 값
 * @param index 새로운 값으로 바뀔 인덱스
 * @returns 값이 바뀐 배열
 */
export function changeValueInArray<T>(array: T[], value: T, index: number) {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}

/**
 * @param thisUrl 전체 URL
 * @returns URL에서 마지막 `/` 뒤의 문자열
 */
export const getEndPoint = (thisUrl: string) => {
  const splitedUrl = thisUrl.split('/');
  return splitedUrl[splitedUrl.length - 1];
};

/**
 * 인자를 에러 객체로 반환합니다. throw는 하지 않습니다.
 */
export const createError = (error: string | undefined) => {
  return new Error(error);
};

/**
 * 비동기 테스트 기능으로 실행시 인자 값만큼 지연시간을 줍니다.
 * @param milisecond 입력하지 않으면 기본값 500입니다.
 */
export const delay = (milisecond: number = 500) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milisecond);
  });
};
