import { FormHTMLAttributes, ReactNode } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export default function Form({ children, ...rest }: FormProps) {
  return (
    <form
      className="mx-auto relative flex flex-col border max-w-md items-center gap-4 p-10"
      {...rest}
    >
      {children}
    </form>
  );
}
