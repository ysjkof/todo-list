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

export const createTodoMutation = async (
  createTodoInputDto: CreateTodoInputDto
): Promise<CreateTodoOutputDto> => {
  const result = await fetcher<CreateTodoOutputDto>(
    'todos',
    'POST',
    createTodoInputDto
  );
  return result;
};

export const getTodos = async (): Promise<TodoOutputDto> => {
  const result = await fetcher<TodoOutputDto>('todos', 'GET');
  return result;
};

export const getTodoById = async ({
  id,
}: GetTodoByIdInputDto): Promise<GetTodoByIdOutputDto> => {
  const result = await fetcher<GetTodoByIdOutputDto>(`todos/${id}`, 'GET');
  return result;
};

export const updateTodoMutation = async ({
  id,
  title,
  content,
}: UpdateTodoInputDto): Promise<UpdateTodoOutputDto> => {
  const result = await fetcher<UpdateTodoOutputDto>(`todos/${id}`, 'PUT', {
    title,
    content,
  });
  return result;
};

export const deleteTodoMutation = async ({
  id,
}: DeleteTodoByIdInputDto): Promise<DeleteTodoByIdOutputDto> => {
  const result = await fetcher<DeleteTodoByIdOutputDto>(
    `todos/${id}`,
    'DELETE'
  );
  return result;
};
