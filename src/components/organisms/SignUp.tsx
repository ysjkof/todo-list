import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpQuery } from '../../controller/authController';
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
import { LoginInputType } from '../../types/authType';

export default function SignUp() {
  const navigation = useNavigate();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isPassedValidations(Object.values(validations))) return;

    if (!emailInput.current || !passwordInput.current)
      throw new Error('email이나 password를 알 수 없습니다');

    const response = await signUpQuery({
      email: emailInput.current.value,
      password: passwordInput.current.value,
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
    <Form onSubmit={handleSubmit}>
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
      <Button disable={!isPassedValidations(Object.values(validations))}>
        회원가입
      </Button>
      {error && <ErrorMessage textContent={error} />}
    </Form>
  );
}
