import { FormEvent, useState } from 'react';
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
  CreateTodoOutputDto,
  DeleteTodoByIdInputDto,
  DeleteTodoByIdOutputDto,
  GetTodoByIdOutputDto,
  Todo,
  TodosOutputDto,
  UpdateTodoInputDto,
  UpdateTodoOutputDto,
} from '../types/todos';
import { removeItemInArrayByIndex } from '../utils/utils';
import TodoTitleList from '../components/organisms/TodoTitleList';
import TodoTitleContent from '../components/organisms/TodoTitleContent';
import { toLocaleStringFromStringDate } from '../utils/todoUtils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../App';

export default function TodoList() {
  const [hasUpdateInput, setHasUpdateInput] = useState(false);
  const [todoToBeModified, setTodoToBeModified] = useState<Todo | null>(null);

  const navigation = useNavigate();
  const param = useParams();

  const { data: todoData } = useQuery<GetTodoByIdOutputDto>(
    ['todo', param.todoId],
    () => getTodoById({ id: param.todoId! })
  );

  const { data: todosData } = useQuery<TodosOutputDto>(['todos'], getTodos);

  const createMutation = useMutation<
    CreateTodoOutputDto,
    unknown,
    CreateTodoInputDto
  >(createTodo, {
    // onSuccess: mutation 이 성공하고 결과를 전달할 때 실행
    onSettled: (data) => {
      queryClient.setQueryData(['todos'], (prevData?: TodosOutputDto) => {
        if (!prevData?.todos || !data?.todo) return;
        return { ...prevData, todos: [...prevData.todos, data.todo] };
      });
    },
  });

  const createSubmit = (
    event: FormEvent,
    { title, content }: CreateTodoInputDto
  ) => {
    event.preventDefault();
    if (!title || !content) throw new Error('데이터를 입력해주세요');
    createMutation.mutate({ title, content });
  };

  const updateMutation = useMutation<
    UpdateTodoOutputDto,
    unknown,
    UpdateTodoInputDto
  >(updateTodo, {
    // onSettled: mutation 이 성공해서 성공한 데이터 또는 error가 전달될 때 실행
    onSettled: (data) => {
      queryClient.setQueryData(['todo', data?.todo?.id], data);

      queryClient.setQueryData(['todos'], (todosData?: TodosOutputDto) => {
        if (!todosData?.todos) return;
        return {
          todos: todosData.todos.map((todo) =>
            todo.id === data?.todo?.id ? data?.todo : todo
          ),
        };
      });
    },
  });
  const updateSubmit = (
    event: FormEvent,
    { id, title, content }: UpdateTodoInputDto
  ) => {
    event.preventDefault();

    if (!id || !title || !content) throw new Error('데이터를 입력해주세요');

    updateMutation.mutate({ id, content, title });

    setTodoToBeModified(null);
    setHasUpdateInput(false);
  };

  const deleteMutation = useMutation<
    DeleteTodoByIdOutputDto,
    unknown,
    DeleteTodoByIdInputDto
  >(deleteTodoById);

  const deleteTodo = (todoId: string) => {
    // 만약 mutate작업을 map으로 여러번 반복할때,
    // onSettled 등 side effect 함수를 mutate에서 설정하면 마지막 뮤테이션에서만 한 번 실행되고
    // useMutation에서 side effect 함수를 설정하면 매 반복마다 실행된다.
    deleteMutation.mutate(
      { id: todoId },
      {
        onSettled: (data, _, variables) => {
          if (!data?.ok) {
            alert('todo 삭제에 실패했습니다');
            return;
          }

          if (param.todoId === todoId) {
            navigation('/');
          }

          if (variables.id === todoToBeModified?.id) setTodoToBeModified(null);
          if (hasUpdateInput) setHasUpdateInput(false);

          queryClient.setQueryData(['todo', variables.id], null);
          queryClient.setQueryData(['todos'], (prevData?: TodosOutputDto) => {
            if (!prevData?.todos) return;
            const idx =
              prevData.todos?.findIndex((todo) => todo.id === todoId) || null;
            if (idx === -1 || idx === null)
              throw Error('삭제할 Todo의 index를 찾을 수 없습니다');

            return { todos: removeItemInArrayByIndex(idx, prevData.todos) };
          });
        },
      }
    );
  };

  const showTotoDetail = (todoId: string) => {
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
          {todosData?.todos?.map((todo) => (
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
          {todoData && todoData.todo && (
            <TodoTitleContent
              createdAt={toLocaleStringFromStringDate(todoData.todo.createdAt)}
              updatedAt={toLocaleStringFromStringDate(todoData.todo.updatedAt)}
              title={todoData.todo.title}
              content={todoData.todo.content}
            />
          )}
        </div>
      </div>
    </div>
  );
}
