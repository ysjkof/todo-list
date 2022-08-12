import { ButtonHTMLAttributes } from 'react';
import { cls } from '../../utils/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disable?: boolean;
}

export default function Button({ disable, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cls(
        'whitespace-nowrap rounded-md border border-gray-200 px-4 py-1 text-gray-400',
        !disable ? 'border-orange-500 bg-orange-500 text-white' : ''
      )}
    ></button>
  );
}
