export interface ISignInRequest {
  user: {
    email: string;
    id: string;
    name: string;
  };
}

export interface ISignUpRequest {
  data: {
    name: string;
    email: string;
    password: string;
  };
  message: string;
}
