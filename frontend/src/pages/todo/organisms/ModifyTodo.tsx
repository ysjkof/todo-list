import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import TodoForm from './TodoForm';
import todoController from '../../../controller/todoController';
import { todoKeys } from '../../../hooks/useTodo';
import { queryClient } from '../../../store';
import {
  TodosOutputDto,
  UpdateTodoInputDto,
  UpdateTodoOutputDto,
} from '../../../types/dtos/todoDto';
import { Todo } from '../../../types/todoType';
import { createError } from '../../../utils/utils';

interface ModifyTodoProps {
  changeModeToView: () => void;
  setToBeModify: React.Dispatch<React.SetStateAction<Todo | null>>;
  toBeModify?: Todo | null;
}

export default function ModifyTodo({
  changeModeToView,
  setToBeModify,
  toBeModify,
}: ModifyTodoProps) {
  const navigation = useNavigate();
  const { mutate } = useMutation(todoController.updateTodoMutation);

  const onSuccess = (
    data: UpdateTodoOutputDto,
    variables: UpdateTodoInputDto
  ) => {
    setToBeModify(null);
    changeModeToView();
    data.todo?.id && navigation(`/${data.todo.id}`);
    if (!variables.id)
      throw createError('todo 업데이트 완료 후 todo id를 찾을 수 없습니다');
    queryClient.setQueryData(todoKeys.detail(variables.id), { ...data });
    queryClient.setQueryData<TodosOutputDto>(todoKeys.lists, (todosData) => {
      if (!todosData?.todos) return;
      let todos = todosData.todos;
      if (data.todo) {
        todos = todosData.todos.map((todo) =>
          todo.id === data.todo?.id ? data.todo : todo
        );
      }
      return { ...todosData, todos };
    });
  };

  const updateTodo = async ({ id, title, content }: UpdateTodoInputDto) => {
    mutate({ id, title, content }, { onSuccess });
  };

  return (
    <TodoForm
      actionName="수정"
      submitCallback={updateTodo}
      toBeModify={toBeModify}
    />
  );
}
