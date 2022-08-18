import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext, queryClient } from '../App';
import authController from '../controller/authController';
import { isPassedValidations, setUserToken } from '../services/authServices';
import { LoginInputType, SignUpInputType } from '../types/authType';
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

  const changeValidation = (input: LoginInputType | SignUpInputType) => {
    setValidations((prevState) => {
      return { ...prevState, [input]: !prevState[input] };
    });
  };

  function onSuccess(data: LoginOutputDto | SignUpOutputDto) {
    if (data.ok && data.token) {
      setUserToken(data.token);
      changeLoggedIn(true);
      return;
    }
    queryClient.clear();
  }

  const useLoginMutation = useMutation(authController.loginMutation);
  const useSignupMutation = useMutation(authController.signUpMutation);

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
