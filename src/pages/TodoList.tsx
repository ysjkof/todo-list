import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createTodo,
  deleteTodoById,
  getTodoById,
  getTodos,
  updateTodo,
} from '../controller/todoController';
import TodoForm from '../components/organisms/TodoForm';
import { CreateTodoInputDto, Todo, UpdateTodoInputDto } from '../types/todos';
import { changeValueInArray, removeItemInArrayByIndex } from '../utils/utils';

export default function TodoList() {
  const [todoData, setTodoData] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [hasUpdateInput, setHasUpdateInput] = useState(false);
  const [todoToBeModified, setTodoToBeModified] = useState<Todo | null>(null);

  const navigation = useNavigate();

  useEffect(() => {
    (async () => {
      const todos = await getTodos();
      setTodoData(todos.todos || []);
    })();
  }, []);

  const createSubmit = async (
    event: FormEvent,
    { title, content }: CreateTodoInputDto
  ) => {
    event.preventDefault();

    if (!title || !content) throw new Error('데이터를 입력해주세요');

    const createdTodo = await createTodo({ content, title });
    if (createdTodo.todo) {
      setTodoData((prevState) => [...prevState, createdTodo.todo!]);
    }
  };
  const updateSubmit = async (
    event: FormEvent,
    { id, title, content }: UpdateTodoInputDto
  ) => {
    event.preventDefault();

    if (!id || !title || !content) throw new Error('데이터를 입력해주세요');

    const updatedTodo = await updateTodo({ id, content, title });
    if (updatedTodo.todo) {
      setTodoData((prevState) => {
        const idx = prevState.findIndex((todo) => todo.id === id);
        if (idx === -1)
          throw new Error(
            'Todo 수정 후 업데이트 중 기존 자료를 찾지 못했습니다'
          );
        return changeValueInArray(prevState, updatedTodo.todo!, idx);
      });
    }
    setTodoToBeModified(null);
    setHasUpdateInput(false);
  };

  const deleteTodo = async (todoId: string) => {
    const del = await deleteTodoById({ id: todoId });
    if (!del.ok) alert('todo 삭제에 실패했습니다');
    if (todoId === todo?.id) setTodo(null);
    if (todoId === todoToBeModified?.id) setTodoToBeModified(null);
    if (hasUpdateInput) setHasUpdateInput(false);

    setTodoData((prevState) => {
      const idx = prevState.findIndex((todo) => todo.id === todoId);
      if (idx === -1)
        throw new Error('Todo 삭제 후 업데이트 중 기존 자료를 찾지 못했습니다');
      return removeItemInArrayByIndex(idx, prevState);
    });
  };

  const showTotoDetail = async (todoId: string) => {
    navigation(`/${todoId}`);
  };

  const getTodo = async (todoId: string) => {
    const data = await getTodoById({ id: todoId });
    if (!data.todo) return alert('todo를 찾을 수 없습니다');
    setTodo(data.todo);
  };

  const param = useParams();

  useEffect(() => {
    if (!param.todoId) {
      todo && setTodo(null);
      return;
    }
    getTodo(param.todoId);
  }, [param]);

  const toggleUpdateInput = (todo: Todo) => {
    if (todo && todo.id !== todoToBeModified?.id) {
      setTodoToBeModified(todo);
      return setHasUpdateInput(true);
    }
    setHasUpdateInput((prevState) => {
      if (prevState) {
        setTodoToBeModified(null);
      }
      return !prevState;
    });
  };

  return (
    <div className="max-w-screen-md w-full relative flex flex-col gap-4">
      {hasUpdateInput ? (
        <TodoForm
          actionName="수정"
          onSubmit={updateSubmit}
          todoToBeModified={todoToBeModified}
        />
      ) : (
        <TodoForm actionName="저장" onSubmit={createSubmit} />
      )}
      <div className="flex border-red-400 border">
        <div className="w-full">
          <h2>목록</h2>
          {todoData.map((todo) => (
            <div key={todo.id} className="flex py-0.5 justify-end gap-2">
              <span className="w-full" onClick={() => showTotoDetail(todo.id)}>
                {todo.title}
              </span>
              <button
                onClick={() => toggleUpdateInput(todo)}
                className="rounded-md whitespace-nowrap border px-4"
              >
                {hasUpdateInput && todoToBeModified?.id === todo.id
                  ? '취소'
                  : '수정'}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="rounded-md whitespace-nowrap border px-4"
              >
                지우기
              </button>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col">
          <h2>상세</h2>
          {todo && (
            <>
              <h3 className="font-semibold">제목: {todo.title}</h3>
              <span className="text-gray-500 text-sm">
                생성: {new Date(todo.createdAt).toLocaleString()}
              </span>
              <span className="text-gray-500 text-sm">
                수정: {new Date(todo.updatedAt).toLocaleString()}
              </span>
              <p className="px-4 pt-1">{todo.content}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
