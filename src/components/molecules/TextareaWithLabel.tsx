import { forwardRef } from 'react';

interface TextareaWithLabelProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default forwardRef<HTMLTextAreaElement, TextareaWithLabelProps>(
  function TextareaWithLabel({ label, ...rest }, ref) {
    return (
      <label className="flex w-full flex-col gap-2 text-sm text-gray-700">
        {label}
        <textarea className="border px-4" {...rest} ref={ref} />
      </label>
    );
  }
);
