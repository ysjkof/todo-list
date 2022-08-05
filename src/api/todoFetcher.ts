import { Todo, TodoInput } from '../types/todos';
import { getLocalToken } from '../utils/authUtils';

interface CoreOutput {
  message?: string;
  error?: unknown;
}
interface TodoOutput extends CoreOutput {
  todos?: Todo[];
  token?: string;
}

export const getTodosFetcher = async (): Promise<TodoOutput> => {
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

interface CreateTodoOutput extends CoreOutput {
  todo?: Todo;
  token?: string;
}

export const createTodo = async (
  todoInput: TodoInput
): Promise<CreateTodoOutput> => {
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

interface DeleteTodoInput {
  id: number;
}
interface DeleteTodoOutput extends CoreOutput {
  ok: boolean;
}
export const deleteTodoFetch = async ({
  id,
}: DeleteTodoInput): Promise<DeleteTodoOutput> => {
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
