export interface LoginPayload{
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload{
  fullname?: string;
  username?: string;
}

export interface VerifyPayload{
  email: string;
  code: string;
}