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
  const { data, details, message } = await todoFetch.post<CreateTodoInputDto>(
    '',
    {
      title,
      content,
    }
  );

  if (!data || Array.isArray(data)) {
    throw new Error('createTodo에 실패했습니다. : ' + details);
  }

  return {
    ok: true,
    todo: data,
  };
};

const getTodos = async (): Promise<TodosOutputDto> => {
  const { data, details, message } = await todoFetch.get();

  if (!data || !Array.isArray(data)) {
    throw new Error('getTodos에 실패했습니다. : ' + details);
  }

  return {
    ok: true,
    todos: data,
  };
};

const getTodoById = async ({
  id,
}: GetTodoByIdInputDto): Promise<GetTodoByIdOutputDto> => {
  const { data, details, message } = await todoFetch.getById(id);

  if (!data || Array.isArray(data)) {
    throw new Error('getTodoById에 실패했습니다. : ' + details);
  }

  return {
    ok: true,
    todo: data,
  };
};

const updateTodoMutation = async ({
  content,
  title,
  id,
}: UpdateTodoInputDto): Promise<UpdateTodoOutputDto> => {
  if (!id) throw new Error('updateTodoMutation : id를 입력하세요');

  const { data, details, message } = await todoFetch.put<UpdateTodoInputDto>(
    id,
    { content, title }
  );

  if (details || !data || Array.isArray(data)) {
    throw new Error('update에 실패했습니다. : ' + details);
  }

  return {
    ok: true,
    todo: data,
  };
};

const deleteTodoMutation = async ({
  id,
}: DeleteTodoByIdInputDto): Promise<DeleteTodoByIdOutputDto> => {
  const { data, details, message } = await todoFetch.delete(id);

  if (data || details || message) {
    throw new Error('delete에 실패했습니다. : ' + details);
  }

  return { ok: true };
};

export default {
  createTodoMutation,
  getTodos,
  getTodoById,
  updateTodoMutation,
  deleteTodoMutation,
};
