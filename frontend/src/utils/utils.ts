export const cls = (...rest: string[]) => rest.join(' ');

export function removeItemInArrayByIndex<T>(index: number, array: T[]) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function changeValueInArray<T>(array: T[], value: T, index: number) {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}

export const getEndPoint = (thisUrl: string) => {
  const splitedUrl = thisUrl.split('/');
  return splitedUrl[splitedUrl.length - 1];
};

export const createError = ({
  filename,
  error,
  endpoint,
  message,
}: {
  filename: string;
  error?: unknown;
  endpoint?: string;
  message?: string;
}) => {
  return new Error(`
  파일 : 🗂 ${filename} 🔚 URL 끝점 : 🛣 ${endpoint} 🔚
  알림 : 😱 ${message} 🔚
  에러 : 🚨 ${error} 🔚
  `);
};
