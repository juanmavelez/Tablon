import { ICourse } from '@core/models/course.model';
export interface IResponse {
  data: ICourse[];
  message: string;
}
