import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../constants/localStorageKeys';
import { signUpMutation } from '../controller/authController';
import { isPassedValidations } from '../services/authServices';
import { SignUpInputType } from '../types/authType';
import { SignUpInputDto } from '../types/dtos/authDto';

export default function useSignUp() {
  const navigation = useNavigate();
  const [validations, setValidations] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState('');

  const changeValidation = (loginInput: SignUpInputType) => {
    setValidations((prevState) => {
      return { ...prevState, [loginInput]: !prevState[loginInput] };
    });
  };

  const submitCallback = async (signUpInput: SignUpInputDto) => {
    if (!isPassedValidations(Object.values(validations))) return;
    const response = await signUpMutation(signUpInput);

    if (response.token) {
      if (confirm('회원가입을 성공했습니다. 바로 로그인 하시겠습니까?')) {
        localStorage.setItem(TOKEN_KEY, response.token);
        navigation('/');
      }
      return;
    }
    if (response.message) setError(response.message);
  };
  return { validations, error, changeValidation, submitCallback };
}
