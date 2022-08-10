import { fetcher } from '../api/fetcher';
import {
  CreateTodoInputDto,
  CreateTodoOutputDto,
  DeleteTodoByIdInputDto,
  DeleteTodoByIdOutputDto,
  GetTodoByIdInputDto,
  GetTodoByIdOutputDto,
  TodoOutputDto,
  UpdateTodoInputDto,
  UpdateTodoOutputDto,
} from '../types/dtos/todoDto';

export const getTodos = async (): Promise<TodoOutputDto> => {
  const result = await fetcher('todos', 'GET');
  return { todos: result.data };
};

export const getTodoById = async ({
  id,
}: GetTodoByIdInputDto): Promise<GetTodoByIdOutputDto> => {
  const result = await fetcher(`todos/${id}`, 'GET');
  return { todo: result.data };
};

export const createTodo = async (
  createTodoInputDto: CreateTodoInputDto
): Promise<CreateTodoOutputDto> => {
  const result = await fetcher('todos', 'POST', createTodoInputDto);
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
