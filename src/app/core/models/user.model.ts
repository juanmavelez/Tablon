export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  courses: string[];
}

export interface IResponseUser {
  data: IUser;
  message: string;
}
