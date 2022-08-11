import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../constants/localStorageKeys';
import { loginMutation, signUpMutation } from '../controller/authController';
import { isPassedValidations } from '../services/authServices';
import { LoginInputType } from '../types/authType';
import { LoginInputDto, SignUpInputDto } from '../types/dtos/authDto';

export default function useAuth() {
  const navigation = useNavigate();
  const [validations, setValidations] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState('');

  const changeValidation = (loginInput: LoginInputType) => {
    setValidations((prevState) => {
      return { ...prevState, [loginInput]: !prevState[loginInput] };
    });
  };

  async function submitCallback(
    todo: 'login' | 'signUp',
    input: LoginInputDto | SignUpInputDto
  ) {
    if (!isPassedValidations(Object.values(validations))) return;

    const response =
      todo === 'login'
        ? await loginMutation(input)
        : await signUpMutation(input);

    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
      navigation('/');
      return;
    }
    if (response.message) setError(response.message);
  }
  return { validations, error, changeValidation, submitCallback };
}
