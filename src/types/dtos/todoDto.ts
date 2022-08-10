import { CoreOutputDto } from '../common';
import { Todo } from '../todoType';

export interface TodoOutputDto extends CoreOutputDto {
  todos?: Todo[];
  token?: string;
}

// CRUD DTO
export interface CreateTodoInputDto extends Pick<Todo, 'title' | 'content'> {}

export interface CreateTodoOutputDto extends CoreOutputDto {
  todo?: Todo;
  token?: string;
}

export interface GetTodoByIdInputDto {
  id: string;
}
export interface GetTodoByIdOutputDto extends CoreOutputDto {
  todo?: Todo;
}

export interface UpdateTodoInputDto extends CreateTodoInputDto {
  id?: string;
}
export interface UpdateTodoOutputDto extends CoreOutputDto {
  todo?: Todo;
}

export interface DeleteTodoByIdInputDto {
  id: string;
}
export interface DeleteTodoByIdOutputDto extends CoreOutputDto {
  ok: boolean;
}
