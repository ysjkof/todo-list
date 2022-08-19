import { FormEvent, useEffect, useRef } from 'react';
import {
  CreateTodoInputDto,
  UpdateTodoInputDto,
} from '../../../types/dtos/todoDto';
import { Todo } from '../../../types/todoType';
import Button from '../../../components/atom/Button';

type SubmitCallbackInputs = UpdateTodoInputDto | CreateTodoInputDto;

interface TodoFormProps {
  actionName: string;
  submitCallback: (inputs: SubmitCallbackInputs) => Promise<void>;
  toBeModify?: Todo | null;
}
export default function TodoForm({
  actionName,
  submitCallback,
  toBeModify,
}: TodoFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (inputRef.current && textareaRef.current) {
    if (toBeModify) {
      inputRef.current.value = toBeModify.title;
      textareaRef.current.value = toBeModify.content;
    } else {
      inputRef.current.value = '';
      textareaRef.current.value = '';
    }
  }

  const invokeSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!inputRef.current?.value) throw new Error('제목을 입력하세요');

    submitCallback({
      ...(toBeModify && { id: toBeModify.id }),
      title: inputRef.current.value,
      content: textareaRef.current?.value,
    });
  };

  useEffect(() => {
    if (toBeModify && inputRef.current && textareaRef.current) {
      inputRef.current.value = toBeModify.title;
      textareaRef.current.value = toBeModify.content;
    }
  }, []);

  return (
    <form
      onSubmit={invokeSubmit}
      className="flex h-full w-full flex-col gap-1 p-2"
    >
      <input
        name="title"
        type="text"
        ref={inputRef}
        className="overflow-hidden text-ellipsis whitespace-nowrap border px-2 text-xl font-extrabold"
        placeholder="제목"
        autoFocus
      />
      <textarea
        name="content"
        ref={textareaRef}
        className="overflow-y-scroll border p-2"
        style={{ height: 'calc(100% - 4rem)' }}
        placeholder="내용"
      />
      <Button>{actionName}</Button>
    </form>
  );
}
