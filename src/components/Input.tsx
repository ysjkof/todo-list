import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export type RefTypeWithNull =
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

export default forwardRef(function Input({ label, ...rest }: InputProps, ref) {
  return (
    <label className="flex flex-col w-full gap-2 text-gray-700 text-sm">
      {label}
      <input className="border-b px-4" {...rest} ref={ref as RefTypeWithNull} />
    </label>
  );
});
