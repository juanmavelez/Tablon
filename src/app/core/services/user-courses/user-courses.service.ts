import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import {
  IResponseCourses,
  IResponseUsers,
  IResponseCreateUserCourse,
  IResnseDeleteUserCourse,
} from '@core/models/course.model';
import { IResponseUserCoursesId } from '@core/models/user-courses.model';

@Injectable({
  providedIn: 'root',
})
export class UserCoursesService {
  constructor(private http: HttpClient) {}

  getUserCoursesId(query: any): Observable<IResponseUserCoursesId> {
    let params = new HttpParams();
    Object.keys(query).forEach((element) => {
      params = params.append(`${element}`, query[`${element}`]);
    });
    return this.http
      .get<IResponseUserCoursesId>(`/user-courses-proxy/`, { params })
      .pipe(retry(3));
  }

  getUserCourses(id: string): Observable<IResponseCourses> {
    return this.http
      .get<IResponseCourses>(`/user-courses-proxy/user/${id}`)
      .pipe(retry(3));
  }

  getCourseUsers(id: string): Observable<IResponseUsers> {
    return this.http
      .get<IResponseUsers>(`/user-courses-proxy/courses/${id}`)
      .pipe(retry(3));
  }

  createUserCourse(
    userId: string,
    courseId: string
  ): Observable<IResponseCreateUserCourse> {
    return this.http
      .post<IResponseCreateUserCourse>(`/user-courses-proxy/${userId}`, {
        user_id: userId,
        courses_id: courseId,
      })
      .pipe(retry(3));
  }

  deleteUserCourse(userCourseId: string): Observable<IResnseDeleteUserCourse> {
    return this.http
      .delete<IResnseDeleteUserCourse>(`/user-courses-proxy/${userCourseId}`)
      .pipe(retry(3));
  }
}
