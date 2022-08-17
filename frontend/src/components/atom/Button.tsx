import { ButtonHTMLAttributes } from 'react';
import { cls } from '../../utils/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disable?: boolean;
  width?: 'lg';
}

export default function Button({ disable, width, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cls(
        'whitespace-nowrap rounded-md border border-gray-200 px-2 text-gray-400',
        width === undefined ? '' : width === 'lg' ? 'w-28' : '',
        disable ? '' : 'border-orange-400 bg-orange-400 text-white'
      )}
    ></button>
  );
}
