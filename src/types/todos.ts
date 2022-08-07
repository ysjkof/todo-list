import { CoreOutputDto } from './common';

export interface Todo {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

export type TodoInput = Pick<Todo, 'title' | 'content'>;

export interface TodoOutputDto extends CoreOutputDto {
  todos?: Todo[];
  token?: string;
}

// CRUD DTO
export interface CreateTodoInputDto extends TodoInput {}

export interface CreateTodoOutputDto extends CoreOutputDto {
  todo?: Todo;
  token?: string;
}

export interface GetTodoInputDto {
  id: string;
}
export interface GetTodoOutputDto extends CoreOutputDto {
  todo?: Todo;
}

export interface UpdateTodoInputDto extends TodoInput {
  id?: string;
}
export interface UpdateTodoOutputDto extends CoreOutputDto {
  todo?: Todo;
}

export interface DeleteTodoInputDto {
  id: string;
}
export interface DeleteTodoOutputDto extends CoreOutputDto {
  ok: boolean;
}
