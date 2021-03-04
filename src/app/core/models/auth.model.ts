export interface ISignInRequest {
  user: {
    email: string;
    id: string;
    name: string;
  };
}

export interface ISignUpRequest {
  name: string;
  email: string;
  password: string;
}
