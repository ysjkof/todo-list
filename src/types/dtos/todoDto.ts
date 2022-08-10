import { CoreOutputDto } from './commonDto';
import { Todo } from '../todoType';

export interface TodoOutputDto extends CoreOutputDto {
  data?: Todo[];
}

// CRUD DTO
export interface CreateTodoInputDto extends Pick<Todo, 'title' | 'content'> {}

export interface CreateTodoOutputDto extends CoreOutputDto {
  data?: Todo;
}

export interface GetTodoByIdInputDto {
  id: string;
}
export interface GetTodoByIdOutputDto extends CoreOutputDto {
  data?: Todo;
}

export interface UpdateTodoInputDto extends CreateTodoInputDto {
  id: string;
}
export interface UpdateTodoOutputDto extends CoreOutputDto {
  data?: Todo;
}

export interface DeleteTodoByIdInputDto {
  id: string;
}
export interface DeleteTodoByIdOutputDto extends CoreOutputDto {
  data?: string | null;
}
