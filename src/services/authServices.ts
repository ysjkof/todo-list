import { REGEX } from '../constants/regex';
import { LoginInput } from '../pages/Login';

export const isPassedValidations = (inputs: boolean[]) =>
  inputs.every((value) => value);

export const checkValidation = (inputValue: string, regex: RegExp) => {
  return new RegExp(regex).test(inputValue);
};

export const handleInputChange = (
  ref: React.RefObject<HTMLInputElement>,
  type: 'email' | 'password',
  currentValue: boolean,
  callback: (loginInput: LoginInput) => void
) => {
  const isValid = checkValidation(ref.current?.value || '', REGEX[type]);
  if (isValid === currentValue) return;

  callback(type);
};
