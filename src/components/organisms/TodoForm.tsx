import { FormEvent, useRef } from 'react';
import {
  CreateTodoInputDto,
  UpdateTodoInputDto,
} from '../../types/dtos/todoDto';
import { Todo } from '../../types/todoType';
import InputWithLabel from '../molecules/InputWithLabel';
import TextareaWithLabel from '../molecules/TextareaWithLabel';

type SubmitCallbackInputs = UpdateTodoInputDto | CreateTodoInputDto;

interface TodoFormProps {
  actionName: string;
  submitCallback: (inputs: SubmitCallbackInputs) => Promise<void>;
  todoToBeModified?: Todo | null;
}
export default function TodoForm({
  actionName,
  submitCallback,
  todoToBeModified,
}: TodoFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (inputRef.current && textareaRef.current) {
    if (todoToBeModified) {
      inputRef.current.value = todoToBeModified.title;
      textareaRef.current.value = todoToBeModified.content;
    } else {
      inputRef.current.value = '';
      textareaRef.current.value = '';
    }
  }

  const invokeSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!inputRef.current || !textareaRef.current)
      return alert('제목과 내용을 입력하세요');

    submitCallback({
      ...(todoToBeModified && { id: todoToBeModified.id }),
      title: inputRef.current.value,
      content: textareaRef.current.value,
    });
  };

  return (
    <form
      onSubmit={invokeSubmit}
      className="flex w-full flex-col items-center gap-1 px-20"
    >
      <InputWithLabel label="제목" type="text" ref={inputRef} />
      <TextareaWithLabel label="할일" ref={textareaRef} />
      <button className="w-full rounded-sm bg-orange-400 text-white">
        {actionName}
      </button>
    </form>
  );
}
