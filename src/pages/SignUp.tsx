import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpFetcher } from '../api/fetcher';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import Form from '../components/Form';
import FormTitle from '../components/FormTitle';
import Input from '../components/Input';
import { TOKEN_KEY } from '../constants/localStorageKeys';
import {
  handleInputChange,
  isPassedValidations,
} from '../services/authServices';
import { LoginInput } from './Login';

export default function SignUp() {
  const navigation = useNavigate();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [validations, setValidations] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState('');

  const changeValidation = (loginInput: LoginInput) => {
    setValidations((prevState) => {
      return { ...prevState, [loginInput]: !prevState[loginInput] };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isPassedValidations(Object.values(validations))) return;

    const response = await signUpFetcher({
      email: emailInput.current!.value,
      password: passwordInput.current!.value,
    });

    if (response.token) {
      if (confirm('회원가입을 성공했습니다. 바로 로그인 하시겠습니까?')) {
        localStorage.setItem(TOKEN_KEY, response.token);
        navigation('/');
      }
      return;
    }

    setError(response.message);
  };

  return (
    <Form>
      <FormTitle textContent="회원가입" />
      <Input
        label="이메일"
        type="text"
        placeholder="이메일"
        ref={emailInput}
        onChange={() =>
          handleInputChange(
            emailInput,
            'email',
            validations.email,
            changeValidation
          )
        }
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호"
        ref={passwordInput}
        onChange={() =>
          handleInputChange(
            passwordInput,
            'password',
            validations.password,
            changeValidation
          )
        }
      />
      <Button
        textContent="회원가입"
        disable={isPassedValidations(Object.values(validations))}
      />
      {error && <ErrorMessage textContent={error} />}
    </Form>
  );
}
