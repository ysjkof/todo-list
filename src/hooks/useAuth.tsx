import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginMutation, signUpMutation } from '../controller/authController';
import { isPassedValidations, setUserToken } from '../services/authServices';
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

    const { token, message } =
      todo === 'login'
        ? await loginMutation(input)
        : await signUpMutation(input);

    if (token) {
      setUserToken(token);
      navigation('/');
      return;
    }
    if (message) setError(message);
  }
  return { validations, error, changeValidation, submitCallback };
}
