import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { queryClient } from '../App';
import {
  createTodoMutation,
  deleteTodoMutation,
  getTodoById,
  getTodos,
  updateTodoMutation,
} from '../controller/todoController';
import { isSameTodo } from '../services/todoServices';
import {
  CreateTodoInputDto,
  TodosOutputDto,
  UpdateTodoInputDto,
} from '../types/dtos/todoDto';
import { Todo } from '../types/todoType';
import { removeItemInArrayByIndex } from '../utils/utils';

type ModeType = 'view' | 'edit' | 'create';

export default function useTodo() {
  const [todoToBeModified, setTodoToBeModified] = useState<Todo | null>(null);
  const [mode, setMode] = useState<ModeType>('view');

  const toggleCreateOrView = () => {
    mode !== 'create' ? setMode('create') : setMode('view');
  };
  const param = useParams();
  const navigation = useNavigate();

  const { data: selectedTodo } = useQuery(
    ['todo', param.todoId],
    () => getTodoById({ id: param.todoId! }),
    { enabled: !!param.todoId }
  );

  const useCreateTodoMutation = useMutation(createTodoMutation);
  const createTodo = async ({ title, content }: CreateTodoInputDto) => {
    useCreateTodoMutation.mutate(
      { title, content },
      {
        onSuccess: (data) => {
          setMode('view');
          data.todo?.id && navigation(`/${data.todo.id}`);
          queryClient.setQueryData<TodosOutputDto>(['todos'], (prevData) => {
            if (!prevData?.todos || !data.todo) return;
            return { ...prevData, todos: [...prevData.todos, data.todo] };
          });
        },
      }
    );
    // if (!todo) return alert(TODO_ALERTS.FAIL_CREATE);
  };

  const updateToTodoList = useMutation(updateTodoMutation);
  const updateTodo = async ({ id, title, content }: UpdateTodoInputDto) => {
    updateToTodoList.mutate(
      { id, title, content },
      {
        onSuccess: (data, variables) => {
          setTodoToBeModified(null);
          setMode('view');
          data.todo?.id && navigation(`/${data.todo.id}`);

          queryClient.setQueryData(['todo', variables.id], { ...data });
          queryClient.setQueryData<TodosOutputDto>(['todos'], (todosData) => {
            if (!todosData?.todos) return;
            let todos = todosData.todos;
            if (data.todo) {
              todos = todosData.todos.map((todo) =>
                todo.id === data.todo?.id ? data.todo : todo
              );
            }
            return { ...todosData, todos };
          });
        },
      }
    );
  };

  const deleteFromTodoList = useMutation(deleteTodoMutation);
  const deleteTodo = async (id: string) => {
    deleteFromTodoList.mutate(
      { id },
      {
        onSuccess: (_, variables) => {
          if (param.todoId === id) {
            navigation('/');
          }

          if (variables.id === todoToBeModified?.id) setTodoToBeModified(null);

          setMode('view');
          queryClient.setQueryData(['todo', variables.id], null);
          queryClient.setQueryData<TodosOutputDto>(['todos'], (prevData) => {
            if (!prevData?.todos) return;
            const idx = prevData.todos.findIndex((todo) => todo.id === id);

            if (idx === -1)
              throw Error('삭제할 Todo의 index를 찾을 수 없습니다');

            return {
              ...prevData,
              todos: removeItemInArrayByIndex(idx, prevData.todos),
            };
          });
        },
      }
    );
    // if (!ok) alert(TODO_ALERTS.FAIL_DELETE);
  };

  const toggleEditOrView = (todo: Todo) => {
    if (mode !== 'edit') {
      setMode('edit');
      setTodoToBeModified((prevTodo) => {
        return isSameTodo(todo?.id, todoToBeModified?.id) ? prevTodo : todo;
      });
      return;
    }

    if (todo.id !== todoToBeModified?.id) {
      return setTodoToBeModified(todo);
    }

    setTodoToBeModified(null);
    setMode('view');
  };

  const { data: todoList } = useQuery(['todos'], () => getTodos());

  useEffect(() => {
    if (todoToBeModified) {
      setTodoToBeModified(null);
      setMode('view');
      return;
    }
  }, [param]);

  return {
    todoToBeModified,
    mode,
    todoList,
    createTodo,
    updateTodo,
    deleteTodo,
    selectedTodo,
    toggleEditOrView,
    toggleCreateOrView,
  };
}
