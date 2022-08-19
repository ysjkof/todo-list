import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import todoController from '../controller/todoController';
import { isSameTodo } from '../services/todoServices';
import { queryClient } from '../store';
import { TodosOutputDto } from '../types/dtos/todoDto';
import { Todo } from '../types/todoType';
import { removeItemInArrayByIndex } from '../utils/utils';

export type ModeType = 'view' | 'edit' | 'create';
export const todoKeys = {
  lists: ['todos'] as const,
  detail: (id: number | string) => [...todoKeys.lists, id] as const,
};

export default function useTodo() {
  const param = useParams();
  const navigation = useNavigate();

  const [toBeModify, setToBeModify] = useState<Todo | null>(null);
  const [mode, setMode] = useState<ModeType>('view');

  const changeModeToView = () => setMode('view');
  const changeModeToCreate = () => setMode('create');
  const changeModeToEdit = () => setMode('edit');

  const toggleCreateOrView = () => {
    mode !== 'create' ? changeModeToCreate() : changeModeToView();
  };

  const deleteFromTodoList = useMutation(todoController.deleteTodoMutation);

  const deleteTodo = async (id: string) => {
    deleteFromTodoList.mutate(
      { id },
      {
        onSuccess: (_, variables) => {
          if (param.todoId === id) {
            navigation('/');
          }

          if (variables.id === toBeModify?.id) setToBeModify(null);

          changeModeToView();
          queryClient.setQueryData(todoKeys.detail(variables.id), null);
          queryClient.setQueryData<TodosOutputDto>(
            todoKeys.lists,
            (prevData) => {
              if (!prevData?.todos) return;
              const idx = prevData.todos.findIndex((todo) => todo.id === id);

              if (idx === -1)
                throw Error('삭제할 Todo의 index를 찾을 수 없습니다');

              return {
                ...prevData,
                todos: removeItemInArrayByIndex(idx, prevData.todos),
              };
            }
          );
        },
      }
    );
  };

  const showTodoDetail = async (todoId: string) => {
    changeModeToView();
    navigation(`/${todoId}`);
  };

  const toggleEditOrView = (todo: Todo) => {
    if (mode !== 'edit') {
      changeModeToEdit();
      setToBeModify((prevTodo) => {
        return isSameTodo(todo?.id, toBeModify?.id) ? prevTodo : todo;
      });
      return;
    }

    if (todo.id !== toBeModify?.id) {
      return setToBeModify(todo);
    }

    setToBeModify(null);
    changeModeToView();
  };

  useEffect(() => {
    if (toBeModify) {
      setToBeModify(null);
      changeModeToView();
      return;
    }
  }, [param]);

  return {
    toBeModify,
    mode,
    changeModeToView,
    setToBeModify,
    deleteTodo,
    showTodoDetail,
    toggleEditOrView,
    toggleCreateOrView,
  };
}
