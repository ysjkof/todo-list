import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginQuery } from '../../controller/authController';
import Button from '../atom/Button';
import ErrorMessage from '../atom/ErrorMessage';
import Form from '../atom/Form';
import FormTitle from '../atom/FormTitle';
import Input from '../molecules/InputWithLabel';
import { TOKEN_KEY } from '../../constants/localStorageKeys';
import {
  handleInputChange,
  isPassedValidations,
} from '../../services/authServices';
import { LoginInput } from '../../types/auth';

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

    const response = await loginQuery({
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
      <Button disable={!isPassedValidations(Object.values(validations))}>
        로그인
      </Button>
      {error && <ErrorMessage textContent={error} />}
    </Form>
  );
}
