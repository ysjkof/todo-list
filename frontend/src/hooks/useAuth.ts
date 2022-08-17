import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext, queryClient } from '../App';
import { loginMutation, signUpMutation } from '../controller/authController';
import { isPassedValidations, setUserToken } from '../services/authServices';
import { LoginInputType } from '../types/authType';
import {
  LoginInputDto,
  LoginOutputDto,
  SignUpInputDto,
  SignUpOutputDto,
} from '../types/dtos/authDto';

export default function useAuth() {
  const { changeLoggedIn } = useContext(AuthContext);
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

  function onSuccess(data: LoginOutputDto | SignUpOutputDto) {
    queryClient.clear();
    if (data.ok && data.token) {
      setUserToken(data.token);
      changeLoggedIn(true);
      return;
    }
  }

  const useLoginMutation = useMutation(loginMutation);
  const useSignupMutation = useMutation(signUpMutation);

  async function submitCallback(
    todo: 'login' | 'signUp',
    input: LoginInputDto | SignUpInputDto
  ) {
    if (!isPassedValidations(Object.values(validations))) return;

    todo === 'login'
      ? useLoginMutation.mutate(input, { onSuccess })
      : useSignupMutation.mutate(input, { onSuccess });
  }
  return { validations, error, changeValidation, submitCallback };
}
