import { TOKEN_KEY } from '../constants/localStorageKeys';
import { REGEX } from '../constants/regex';
import { LoginInputType } from '../types/authType';

export const isPassedValidations = (inputs: boolean[]) =>
  inputs.every((value) => value);

/**
 * 확인할 문자열과 정규표현식을 받고 테스트 결과를 반환한다
 */
const checkValidation = (inputValue: string, regex: RegExp) => {
  return new RegExp(regex).test(inputValue);
};

/**
 * @param ref input의 ref
 * @param type input의 name
 * @param currentValidation input의 현재 validation 상태
 * @param onPassValidation validation이 true일 경우 콜백함수
 */
export const handleInputChange = (
  ref: React.RefObject<HTMLInputElement>,
  type: 'email' | 'password',
  currentValidation: boolean,
  onPassValidation: (loginInput: LoginInputType) => void
) => {
  const isValid = checkValidation(ref.current?.value || '', REGEX[type]);
  if (isValid === currentValidation) return;

  onPassValidation(type);
};

export const getUserToken = () => localStorage.getItem(TOKEN_KEY);
export const removeUserToken = () => localStorage.removeItem(TOKEN_KEY);
export const setUserToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token);
