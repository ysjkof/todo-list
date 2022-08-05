import { FormEvent, useRef, useState } from 'react';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../constants/regex';
import { cls } from '../utils/utils';

export default function Login() {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [validations, setValidations] = useState({
    email: false,
    password: false,
  });

  const isPassedValidation = (inputs: boolean[]) =>
    inputs.every((value) => value);

  const checkValidation = (
    ref: React.RefObject<HTMLInputElement>,
    regex: RegExp,
    type: 'email' | 'password'
  ) => {
    const isValid = new RegExp(regex).test(ref.current!.value);
    if (isValid === validations[type]) return;

    setValidations((prevState) => {
      return { ...prevState, [type]: isValid };
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('서브밋');
  };

  return (
    <div>
      login
      <form
        className="flex flex-col border max-w-md items-center gap-4 p-10 mb-10"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col w-full gap-2">
          이메일
          <input
            className="border-b px-4"
            type="text"
            placeholder="이메일"
            ref={emailInput}
            onChange={() => checkValidation(emailInput, REGEX_EMAIL, 'email')}
          />
        </label>
        <label className="flex flex-col w-full gap-2">
          비밀번호
          <input
            className="border-b px-4"
            type="password"
            placeholder="비밀번호"
            ref={passwordInput}
            onChange={() =>
              checkValidation(passwordInput, REGEX_PASSWORD, 'password')
            }
          />
        </label>
        <button
          className={cls(
            'rounded-md px-4 py-1 border border-gray-200 text-gray-400',
            isPassedValidation(Object.values(validations)) &&
              'bg-orange-500 border-orange-500 text-white'
          )}
        >
          로그인
        </button>
      </form>
    </div>
  );
}
