import { ILesson } from '@core/models/lesson.model';

export interface ICourse {
  _id: string;
  name: string;
  teacher: string;
  lessons: ILesson[];
  tags: string[];
  students: string[];
  description: string;
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
