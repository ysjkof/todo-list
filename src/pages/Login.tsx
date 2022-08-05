import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginFetcher } from '../api/fetcher';
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

export type LoginInput = 'email' | 'password';

export default function Login() {
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

    const response = await loginFetcher({
      email: emailInput.current!.value,
      password: passwordInput.current!.value,
    });

    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
      navigation('/');
      return;
    }

    setError(response.message);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle textContent="로그인" />
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
        textContent="로그인"
        disable={isPassedValidations(Object.values(validations))}
      />
      {error && <ErrorMessage textContent={error} />}
    </Form>
  );
}
