import { CoreOutputDto } from './commonDto';
import { Todo } from '../todoType';

export interface TodoOutputDto extends CoreOutputDto {
  todos?: Todo[];
}

// CRUD DTO
export interface CreateTodoInputDto extends Pick<Todo, 'title' | 'content'> {}

export interface CreateTodoOutputDto extends CoreOutputDto {
  todo?: Todo;
}

export interface GetTodoByIdInputDto {
  id: string;
}
export interface GetTodoByIdOutputDto extends CreateTodoOutputDto {}

export interface UpdateTodoInputDto extends CreateTodoInputDto {
  id?: string;
}
export interface UpdateTodoOutputDto extends CreateTodoOutputDto {}

export interface DeleteTodoByIdInputDto {
  id: string;
}
export interface DeleteTodoByIdOutputDto extends CoreOutputDto {}
