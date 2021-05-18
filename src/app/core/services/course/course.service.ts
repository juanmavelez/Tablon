import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ICourse,
  IResponseCourse,
  IResponseCourses,
} from '@core/models/course.model';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<IResponseCourses> {
    return this.http.get<IResponseCourses>(`/courses-proxy`).pipe(retry(3));
  }

  getCourse(id: string): Observable<IResponseCourse> {
    return this.http
      .get<IResponseCourse>(`/courses-proxy/${id}`)
      .pipe(retry(3));
  }

  createCourse(course: ICourse): Observable<object> {
    return this.http.post(`/courses-proxy`, course).pipe(retry(3));
  }

  updateCourse(id: string, changes: Partial<ICourse>): Observable<any> {
    return this.http.put(`/courses-proxy/${id}`, changes).pipe(retry(3));
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`/courses-proxy/${id}`).pipe(retry(3));
  }
}
