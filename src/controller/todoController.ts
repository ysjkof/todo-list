import FetchModule from '../api/fetchModule';
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
import { Todo } from '../types/todoType';

interface TodoFetchResponse {
  data?: Todo | Todo[];
  details?: string;
  message?: string;
}

const TODO_URL = 'http://localhost:8080/todos';
const todoFetch = new FetchModule<TodoFetchResponse>(TODO_URL, fetcher);

export const createTodoMutation = async ({
  title,
  content,
}: CreateTodoInputDto): Promise<CreateTodoOutputDto> => {
  const { data, details, message } = await todoFetch.post<CreateTodoInputDto>(
    '',
    {
      title,
      content,
    }
  );

  if (!data || Array.isArray(data)) {
    return { ok: false, message: message || details || '' };
  }

  return {
    ok: true,
    todo: data,
  };
};

export const getTodos = async (): Promise<TodoOutputDto> => {
  const { data, details, message } = await todoFetch.get();

  if (!data || !Array.isArray(data)) {
    return { ok: false, message: message || details || '' };
  }

  return {
    ok: true,
    todos: data,
  };
};

export const getTodoById = async ({
  id,
}: GetTodoByIdInputDto): Promise<GetTodoByIdOutputDto> => {
  const { data, details, message } = await todoFetch.getById(id);

  if (!data || Array.isArray(data)) {
    return { ok: false, message: message || details || '' };
  }

  return {
    ok: true,
    todo: data,
  };
};

export const updateTodoMutation = async ({
  content,
  title,
  id,
}: UpdateTodoInputDto): Promise<UpdateTodoOutputDto> => {
  if (!id) throw new Error('updateTodoMutation : id를 입력하세요');

  const { data, details, message } = await todoFetch.put<UpdateTodoInputDto>(
    id,
    { content, title }
  );

  if (!data || Array.isArray(data)) {
    return { ok: false, message: message || details || '' };
  }

  return {
    ok: true,
    todo: data,
  };
};

export const deleteTodoMutation = async ({
  id,
}: DeleteTodoByIdInputDto): Promise<DeleteTodoByIdOutputDto> => {
  const { data, details, message } = await todoFetch.delete(id);

  if (data || details || message) {
    return { ok: false };
  }

  return { ok: true };
};
