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
        'rounded-md px-4 py-1 border border-gray-200 text-gray-400 whitespace-nowrap',
        !disable && 'bg-orange-500 border-orange-500 text-white'
      )}
    ></button>
  );
}
