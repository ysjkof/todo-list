import { forwardRef } from 'react';

interface TextareaWithLabelProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export type RefTypeWithNull =
  | React.RefObject<HTMLTextAreaElement>
  | null
  | undefined;

export default forwardRef(function TextareaWithLabel(
  { label, ...rest }: TextareaWithLabelProps,
  ref
) {
  return (
    <label className="flex flex-col w-full gap-2 text-gray-700 text-sm">
      {label}
      <textarea
        className="border px-4"
        {...rest}
        ref={ref as RefTypeWithNull}
      />
    </label>
  );
});
