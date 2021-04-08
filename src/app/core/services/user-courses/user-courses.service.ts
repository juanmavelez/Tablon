import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IResponseCourse,
  IResponseCourseId,
  IResponseCreateUserCourse,
  IResnseDeleteUserCourse,
} from '@core/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class UserCoursesService {
  constructor(private http: HttpClient) {}

  getUserCourses(id: string): Observable<IResponseCourse> {
    return this.http.get<IResponseCourse>(`/user-courses/${id}`);
  }

  getUserCoursesId(userId: string): Observable<IResponseCourseId> {
    return this.http.get<IResponseCourseId>(`/user-courses/user/${userId}`);
  }

  createUserCourse(
    userId: string,
    courseId: string
  ): Observable<IResponseCreateUserCourse> {
    console.log('userid', userId);
    console.log('userid', courseId);
    return this.http.post<IResponseCreateUserCourse>(
      `/user-courses/${userId}`,
      {
        user_id: userId,
        courses_id: courseId,
      }
    );
  }

  deleteUserCourse(userCourseId: string): Observable<IResnseDeleteUserCourse> {
    console.log('im into delete user service');
    return this.http.delete<IResnseDeleteUserCourse>(
      `/user-courses/${userCourseId}`
    );
  }
}
