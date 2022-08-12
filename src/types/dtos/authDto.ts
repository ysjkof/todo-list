import { CoreOutputDto } from './commonDto';

export interface LoginInputDto {
  email: string;
  password: string;
}

export interface Token {
  token?: string;
}
export interface LoginOutputDto extends CoreOutputDto, Token {}

export interface SignUpInputDto extends LoginInputDto {}
export interface SignUpOutputDto extends LoginOutputDto {}
