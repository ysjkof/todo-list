import { FormEvent, useRef } from 'react';
import Button from '../../components/atom/Button';
import ErrorMessage from '../../components/atom/ErrorMessage';
import Form from '../../components/atom/Form';
import FormTitle from '../../components/atom/FormTitle';
import Input from '../../components/molecules/InputWithLabel';
import {
  handleInputChange,
  isPassedValidations,
} from '../../services/authServices';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const { validations, error, changeValidation, submitCallback } = useAuth();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailInput.current?.value || !passwordInput.current?.value) return;

    submitCallback('login', {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
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
