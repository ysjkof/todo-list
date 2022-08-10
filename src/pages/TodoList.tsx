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
import { CreateTodoInputDto, UpdateTodoInputDto } from '../types/dtos/todoDto';
import { changeValueInArray, removeItemInArrayByIndex } from '../utils/utils';
import TodoTitleList from '../components/organisms/TodoTitleList';
import TodoContent from '../components/molecules/TodoContent';
import { toLocaleStringFromStringDate } from '../utils/todoUtils';
import { Todo } from '../types/todoType';

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

    if (!createdTodo.todo) return alert('Todo 등록을 실패했습니다');

    setTodoData((prevState) =>
      createdTodo.todo ? [...prevState, createdTodo.todo] : prevState
    );
  };
  const updateSubmit = async (
    event: FormEvent,
    { id, title, content }: UpdateTodoInputDto
  ) => {
    event.preventDefault();

    if (!id || !title || !content) throw new Error('데이터를 입력해주세요');

    const updatedTodo = await updateTodo({ id, content, title });

    setTodoData((prevState) => {
      if (!updatedTodo.todo) return prevState;

      const idx = prevState.findIndex((todo) => todo.id === id);
      if (idx === -1)
        throw new Error('Todo 수정 후 업데이트 중 기존 자료를 찾지 못했습니다');

      return changeValueInArray(prevState, updatedTodo.todo, idx);
    });

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
    if (!data.todo) {
      alert('todo를 찾을 수 없습니다');
      navigation('/');
      return;
    }
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
    <div className="relative flex w-full max-w-screen-md flex-col gap-4">
      {hasUpdateInput ? (
        <TodoForm
          actionName="수정"
          onSubmit={updateSubmit}
          todoToBeModified={todoToBeModified}
        />
      ) : (
        <TodoForm actionName="저장" onSubmit={createSubmit} />
      )}
      <div className="flex border border-red-400">
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
        <div className="flex w-full flex-col">
          <h2>상세</h2>
          {todo && (
            <TodoContent
              createdAt={toLocaleStringFromStringDate(todo.createdAt)}
              updatedAt={toLocaleStringFromStringDate(todo.updatedAt)}
              title={todo.title}
              content={todo.content}
            />
          )}
        </div>
      </div>
    </div>
  );
}
