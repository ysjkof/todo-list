export const cls = (...rest: any[]) => rest.join(' ');

export function removeItemInArrayByIndex<T>(index: number, array: T[]) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function changeValueInArray<T>(array: T[], value: T, index: number) {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}
