import { ILesson } from '@core/models/lesson.model';
export interface ICourse {
  id: string;
  name: string;
  teacher: string;
  lessons: ILesson[];
  tags: string[];
  students: string[];
  description: string;
}

export interface IResponseCourse {
  data: ICourse[];
  message: string;
}
