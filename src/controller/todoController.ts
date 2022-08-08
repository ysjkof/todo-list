import { fetcher } from '../api/fetcher';
import {
  CreateTodoInputDto,
  CreateTodoOutputDto,
  DeleteTodoByIdInputDto,
  DeleteTodoByIdOutputDto,
  GetTodoByIdInputDto,
  GetTodoByIdOutputDto,
  TodosOutputDto,
  UpdateTodoInputDto,
  UpdateTodoOutputDto,
} from '../types/todos';

export const getTodos = async (): Promise<TodosOutputDto> => {
  const result = await fetcher('todos', 'GET');
  return { todos: result.data };
};

export const getTodoById = async ({
  id,
}: GetTodoByIdInputDto): Promise<GetTodoByIdOutputDto> => {
  if (!id) return { message: 'id를 전달하지 않았습니다.' };
  const result = await fetcher(`todos/${id}`, 'GET');
  return { todo: result.data };
};

export const createTodo = async (
  todoInput: CreateTodoInputDto
): Promise<CreateTodoOutputDto> => {
  const result = await fetcher('todos', 'POST', todoInput);
  return { todo: result.data };
};

export const updateTodo = async ({
  id,
  title,
  content,
}: UpdateTodoInputDto): Promise<UpdateTodoOutputDto> => {
  const result = await fetcher(`todos/${id}`, 'PUT', { title, content });
  return { todo: result.data };
};

export const deleteTodoById = async ({
  id,
}: DeleteTodoByIdInputDto): Promise<DeleteTodoByIdOutputDto> => {
  const result = await fetcher(`todos/${id}`, 'DELETE');
  return { ok: result.data === null && true };
};
