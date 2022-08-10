import { CoreOutputDto } from './commonDto';

export interface LoginInputDto {
  email: string;
  password: string;
}

export interface LoginOutputDto extends CoreOutputDto {
  token?: string;
}

export interface SignUpInputDto extends LoginInputDto {}
export interface SignUpOutputDto extends LoginOutputDto {}
