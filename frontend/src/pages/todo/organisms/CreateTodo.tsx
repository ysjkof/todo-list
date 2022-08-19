import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import TodoForm from './TodoForm';
import todoController from '../../../controller/todoController';
import { todoKeys } from '../../../hooks/useTodo';
import { queryClient } from '../../../store';
import {
  CreateTodoInputDto,
  CreateTodoOutputDto,
  TodosOutputDto,
} from '../../../types/dtos/todoDto';

interface CreateTodoProps {
  changeModeToView: () => void;
}
export default function CreateTodo({ changeModeToView }: CreateTodoProps) {
  const navigation = useNavigate();
  const { mutate } = useMutation(todoController.createTodoMutation);

  const onSuccess = (data: CreateTodoOutputDto) => {
    changeModeToView();
    data.todo?.id && navigation(`/${data.todo.id}`);
    queryClient.setQueryData<TodosOutputDto>(todoKeys.lists, (prevData) => {
      if (!prevData?.todos || !data.todo) return;
      return { ...prevData, todos: [...prevData.todos, data.todo] };
    });
  };

  const createTodo = async ({ title, content }: CreateTodoInputDto) => {
    mutate({ title, content }, { onSuccess });
  };

  return <TodoForm actionName="저장" submitCallback={createTodo} />;
}
