export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  courses: string[];
}

export interface IResponseUser {
  data: IUser;
  message: string;
}
