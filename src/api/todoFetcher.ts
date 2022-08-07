import {
  CreateTodoInputDto,
  CreateTodoOutputDto,
  DeleteTodoInputDto,
  DeleteTodoOutputDto,
  GetTodoInputDto,
  GetTodoOutputDto,
  TodoOutputDto,
  UpdateTodoInputDto,
  UpdateTodoOutputDto,
} from '../types/todos';
import { getLocalToken } from '../utils/authUtils';

export const getTodosFetcher = async (): Promise<TodoOutputDto> => {
  try {
    const response = await fetch('http://localhost:8080/todos', {
      method: 'GET',
      headers: {
        Authorization: getLocalToken() || '',
      },
    });
    const result = await response.json();

    return { todos: result.data };
  } catch (error) {
    return { message: '에러 발생 :', error };
  }
};

export const getTodoFetcher = async ({
  id,
}: GetTodoInputDto): Promise<GetTodoOutputDto> => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: 'GET',
      headers: {
        Authorization: getLocalToken() || '',
      },
    });
    const result = await response.json();

    return { todo: result.data };
  } catch (error) {
    return { message: '에러 발생 :', error };
  }
};

export const createTodo = async (
  todoInput: CreateTodoInputDto
): Promise<CreateTodoOutputDto> => {
  try {
    const response = await fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getLocalToken() || '',
      },
      body: JSON.stringify(todoInput),
    });
    const result = await response.json();

    return { todo: result.data };
  } catch (error) {
    return { message: '에러 발생 :', error };
  }
};

export const updateTodoFetcher = async ({
  id,
  title,
  content,
}: UpdateTodoInputDto): Promise<UpdateTodoOutputDto> => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getLocalToken() || '',
      },
      body: JSON.stringify({ title, content }),
    });
    const result = await response.json();

    return { todo: result.data };
  } catch (error) {
    return { message: '에러 발생 :', error };
  }
};

export const deleteTodoFetch = async ({
  id,
}: DeleteTodoInputDto): Promise<DeleteTodoOutputDto> => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getLocalToken() || '',
      },
    });
    const result = await response.json();

    return { ok: result.data === null && true };
  } catch (error) {
    return { ok: false, message: '에러 발생 :', error };
  }
};
