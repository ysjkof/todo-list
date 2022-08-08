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
import {
  CreateTodoInputDto,
  GetTodoByIdOutputDto,
  Todo,
  UpdateTodoInputDto,
} from '../types/todos';
import { changeValueInArray, removeItemInArrayByIndex } from '../utils/utils';
import TodoTitleList from '../components/organisms/TodoTitleList';
import TodoTitleContent from '../components/organisms/TodoTitleContent';
import { toLocaleStringFromStringDate } from '../utils/todoUtils';
import { useQuery } from '@tanstack/react-query';

export default function TodoList() {
  const [todoData, setTodoData] = useState<Todo[]>([]);
  const [hasUpdateInput, setHasUpdateInput] = useState(false);
  const [todoToBeModified, setTodoToBeModified] = useState<Todo | null>(null);

  const navigation = useNavigate();
  const param = useParams();

  const { data } = useQuery<GetTodoByIdOutputDto>(['todo', param.todoId], () =>
    getTodoById({ id: param.todoId! })
  );

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
    // if (todoId === todo?.todo?.id) setTodo(null);
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
            <TodoTitleList
              key={todo.id}
              id={todo.id}
              title={todo.title}
              isModified={hasUpdateInput && todoToBeModified?.id === todo.id}
              showTotoDetail={() => showTotoDetail(todo.id)}
              toggleUpdateInput={() => toggleUpdateInput(todo)}
              deleteTodo={() => deleteTodo(todo.id)}
            />
          ))}
        </div>
        <div className="w-full flex flex-col">
          <h2>상세</h2>
          {data && data.todo && (
            <TodoTitleContent
              createdAt={toLocaleStringFromStringDate(data.todo.createdAt)}
              updatedAt={toLocaleStringFromStringDate(data.todo.updatedAt)}
              title={data.todo.title}
              content={data.todo.content}
            />
          )}
        </div>
      </div>
    </div>
  );
}
