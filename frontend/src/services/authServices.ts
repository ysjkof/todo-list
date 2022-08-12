import { TOKEN_KEY } from '../constants/localStorageKeys';
import { REGEX } from '../constants/regex';
import { LoginInputType } from '../types/authType';

export const isPassedValidations = (inputs: boolean[]) =>
  inputs.every((value) => value);

export const checkValidation = (inputValue: string, regex: RegExp) => {
  return new RegExp(regex).test(inputValue);
};

export const handleInputChange = (
  ref: React.RefObject<HTMLInputElement>,
  type: 'email' | 'password',
  currentValue: boolean,
  changeValidation: (loginInput: LoginInputType) => void
) => {
  const isValid = checkValidation(ref.current?.value || '', REGEX[type]);
  if (isValid === currentValue) return;

  changeValidation(type);
};

export const getUserToken = () => localStorage.getItem(TOKEN_KEY);
export const removeUserToken = () => localStorage.removeItem(TOKEN_KEY);
export const setUserToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token);
