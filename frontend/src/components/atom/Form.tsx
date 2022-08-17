import { FormHTMLAttributes, ReactNode } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export default function Form({ children, ...rest }: FormProps) {
  return (
    <form
      className="relative mx-auto flex w-full max-w-md flex-col items-center justify-center gap-4 border p-10"
      {...rest}
    >
      {children}
    </form>
  );
}
