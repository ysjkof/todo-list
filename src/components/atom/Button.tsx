import { cls } from '../../utils/utils';

interface ButtonProps {
  textContent: string;
  disable?: boolean;
}

export default function Button({ textContent, disable }: ButtonProps) {
  return (
    <button
      className={cls(
        'rounded-md px-4 py-1 border border-gray-200 text-gray-400',
        disable && 'bg-orange-500 border-orange-500 text-white'
      )}
    >
      {textContent}
    </button>
  );
}
