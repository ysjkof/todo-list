import { Todo, TodoInput } from '../types/todos';
import { getLocalToken } from '../utils/authUtils';

interface TodoOutput {
  todos?: Todo[];
  message?: string;
  token?: string;
  error?: unknown;
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

interface CreateTodoOutput {
  todo?: Todo;
  message?: string;
  token?: string;
  error?: unknown;
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
