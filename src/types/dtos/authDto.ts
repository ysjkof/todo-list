export interface LoginInputDto {
  email: string;
  password: string;
}

export interface LoginOutputDto {
  message: string;
  token?: string;
  error?: unknown;
}

export interface SignUpInputDto extends LoginInputDto {}
