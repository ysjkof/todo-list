import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  createTodo,
  deleteTodoFetch,
  getTodoFetcher,
  getTodosFetcher,
} from '../api/todoFetcher';
import { Todo } from '../types/todos';

export default function TodoList() {
  const [todoData, setTodoData] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    (async () => {
      const todos = await getTodosFetcher();
      console.log('todos', todos);
      setTodoData(todos.todos || []);
    })();
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const title = inputRef.current?.value;
    const content = textareaRef.current?.value;
    if (!title || !content) return console.log('내용이 없어');

    createTodo({ content, title });
  };

  const deleteTodo = async (todoId: string) => {
    const del = await deleteTodoFetch({ id: todoId });
    if (!del.ok) alert('todo 삭제에 실패했습니다');
  };

  const showTotoDetail = async (todoId: string) => {
    const data = await getTodoFetcher({ id: todoId });
    console.log('todo', data.todo);
    if (!data.todo) return alert('todo를 찾을 수 없습니다');
    setTodo(data.todo);
  };

  return (
    <div className="max-w-screen-md w-full relative flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full px-20"
      >
        <label className="w-full">
          제목
          <input className="border w-full" type="text" ref={inputRef} />
        </label>
        <label className="w-full">
          할일
          <textarea className="border w-full" ref={textareaRef} />
        </label>
        <button className="bg-orange-400 text-white rounded-sm w-full">
          저장
        </button>
      </form>
      <div className="flex border-red-400 border">
        <div className="w-full">
          <h2>목록</h2>
          {todoData.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between py-0.5"
              onClick={() => showTotoDetail(todo.id)}
            >
              {todo.title}

              <button
                onClick={() => deleteTodo(todo.id)}
                className="rounded-md border px-4"
              >
                지우기
              </button>
            </div>
          ))}
        </div>
        <div className="w-full">
          <h2>상세</h2>
          {todo && todo.content}
        </div>
      </div>
    </div>
  );
}
