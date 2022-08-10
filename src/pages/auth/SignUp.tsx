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
import useSignUp from '../../hooks/useSignUp';

export default function SignUp() {
  const { validations, error, changeValidation, submitCallback } = useSignUp();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailInput.current || !passwordInput.current)
      throw new Error('email이나 password를 알 수 없습니다');

    submitCallback({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
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
