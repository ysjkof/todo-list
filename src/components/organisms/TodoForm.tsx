import { FormEvent, useRef } from 'react';
import { CreateTodoInput, UpdateTodoInput } from '../../api/todoFetcher';
import { Todo } from '../../types/todos';
import InputWithLabel from '../molecules/InputWithLabel';
import TextareaWithLabel from '../molecules/TextareaWithLabel';

interface TodoFormProps {
  actionName: string;
  onSubmit: (
    event: FormEvent,
    data: CreateTodoInput | UpdateTodoInput
  ) => Promise<void>;
  todoToBeModified?: Todo | null;
}
export default function TodoForm({
  actionName,
  onSubmit,
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

  return (
    <form
      onSubmit={(event) =>
        onSubmit(event, {
          ...(todoToBeModified && { id: todoToBeModified.id }),
          title: inputRef.current!.value,
          content: textareaRef.current!.value,
        })
      }
      className="flex flex-col items-center w-full px-20 gap-1"
    >
      <InputWithLabel label="제목" type="text" ref={inputRef} />
      <TextareaWithLabel label="할일" type="text" ref={textareaRef} />
      <button className="bg-orange-400 text-white rounded-sm w-full">
        {actionName}
      </button>
    </form>
  );
}
