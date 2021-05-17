import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import {
  IResponseCourses,
  IResponseCourseId,
  IResponseUsers,
  IResponseCreateUserCourse,
  IResnseDeleteUserCourse,
} from '@core/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class UserCoursesService {
  constructor(private http: HttpClient) {}

  getUserCourses(id: string): Observable<IResponseCourses> {
    return this.http
      .get<IResponseCourses>(`/user-courses/user/${id}`)
      .pipe(retry(3));
  }

  getCourseUsers(id: string): Observable<IResponseUsers> {
    return this.http
      .get<IResponseUsers>(`/user-courses/user/${id}`)
      .pipe(retry(3));
  }

  getUserCoursesId(userId: string): Observable<IResponseCourseId> {
    return this.http
      .get<IResponseCourseId>(`/user-courses/${userId}`)
      .pipe(retry(3));
  }

  createUserCourse(
    userId: string,
    courseId: string
  ): Observable<IResponseCreateUserCourse> {
    return this.http
      .post<IResponseCreateUserCourse>(`/user-courses/${userId}`, {
        user_id: userId,
        courses_id: courseId,
      })
      .pipe(retry(3));
  }

  deleteUserCourse(userCourseId: string): Observable<IResnseDeleteUserCourse> {
    return this.http
      .delete<IResnseDeleteUserCourse>(`/user-courses/${userCourseId}`)
      .pipe(retry(3));
  }
}
