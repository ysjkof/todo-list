import FetchModule from '../api/fetchModule';
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
} from '../types/dtos/todoDto';
import { Todo } from '../types/todoType';
import { createError } from '../utils/utils';

interface TodoFetchResponse {
  data?: Todo | Todo[];
  details?: string;
  message?: string;
}

const TODO_URL = 'http://localhost:8080/todos';
const todoFetch = new FetchModule<TodoFetchResponse>(TODO_URL, fetcher);

const createTodoMutation = async ({
  title,
  content,
}: CreateTodoInputDto): Promise<CreateTodoOutputDto> => {
  const { data, details } = await todoFetch.post<CreateTodoInputDto>('', {
    title,
    content,
  });

  if (details || !data || Array.isArray(data)) {
    throw createError(details);
  }

  return {
    todo: data,
  };
};

const getTodos = async (): Promise<TodosOutputDto> => {
  const { data, details } = await todoFetch.get();

  if (details || !data || !Array.isArray(data)) {
    throw createError(details);
  }

  return {
    todos: data,
  };
};

const getTodoById = async ({
  id,
}: GetTodoByIdInputDto): Promise<GetTodoByIdOutputDto> => {
  const { data, details } = await todoFetch.getById(id);

  if (details || !data || Array.isArray(data)) {
    throw createError(details);
  }

  return {
    todo: data,
  };
};

const updateTodoMutation = async ({
  content,
  title,
  id,
}: UpdateTodoInputDto): Promise<UpdateTodoOutputDto> => {
  if (!id) throw createError('잘못된 접근입니다. Todo Id가 없습니다');

  const { data, details } = await todoFetch.put<UpdateTodoInputDto>(id, {
    content,
    title,
  });

  if (details || Array.isArray(data) || !data) {
    throw createError(details);
  }

  return {
    todo: data,
  };
};

const deleteTodoMutation = async ({
  id,
}: DeleteTodoByIdInputDto): Promise<DeleteTodoByIdOutputDto> => {
  const { details } = await todoFetch.delete(id);

  if (details) {
    throw createError(details);
  }

  return {};
};

export default {
  createTodoMutation,
  getTodos,
  getTodoById,
  updateTodoMutation,
  deleteTodoMutation,
};
