export interface IUserCourse {
  _id: string;
  courses_id: string;
  user_id: string;
}

export interface IResponseUserCoursesId {
  data: IUserCourse[];
  message: string;
}

export interface IResponseUserCourseId {
  data: IUserCourse;
  message: string;
}
