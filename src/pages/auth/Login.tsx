import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginQuery } from '../../controller/authController';
import Button from '../../components/atom/Button';
import ErrorMessage from '../../components/atom/ErrorMessage';
import Form from '../../components/atom/Form';
import FormTitle from '../../components/atom/FormTitle';
import Input from '../../components/molecules/InputWithLabel';
import { TOKEN_KEY } from '../../constants/localStorageKeys';
import {
  handleInputChange,
  isPassedValidations,
} from '../../services/authServices';
import { LoginInputType } from '../../types/authType';

export default function Login() {
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

    const response = await loginQuery({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
    // console.log('response', response);

    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
      navigation('/');
      return;
    }

    if (response.message) setError(response.message);
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
