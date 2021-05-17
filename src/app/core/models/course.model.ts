import { ILesson } from '@core/models/lesson.model';
import { IUser } from './user.model';

export interface ICourse {
  _id: string;
  name: string;
  teacher: string;
  lessons: ILesson[];
  tags: string[];
  description: string;
}

export interface IResponseUsers {
  data: IUser[];
  message: string;
}

export interface IResponseCourses {
  data: ICourse[];
  message: string;
}

export interface IResponseCourse {
  data: ICourse;
  message: string;
}

export interface IUserCourse {
  _id: string;
  courses_id: string;
  user_id: string;
}

export interface IResponseCourseId {
  data: IUserCourse[];
  message: string;
}

export interface IResponseCreateUserCourse {
  data: string;
  message: string;
}

export interface IResnseDeleteUserCourse {
  data: string;
  message: string;
}
