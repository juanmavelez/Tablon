import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import {
  ICourse,
  IResponseCourse,
  IResponseCourses,
} from '@core/models/course.model';
import { catchError, retry } from 'rxjs/operators';
import { handleHttpErrorResponse } from '@utils/handlerHttpResponseError';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<IResponseCourses> {
    return this.http
      .get<IResponseCourses>(`/courses`)
      .pipe(retry(3), catchError(handleHttpErrorResponse));
  }

  getCourse(id: string): Observable<IResponseCourse> {
    return this.http
      .get<IResponseCourse>(`/courses/${id}`)
      .pipe(retry(3), catchError(handleHttpErrorResponse));
  }

  createCourse(product: ICourse): Observable<object> {
    return this.http
      .post(`${environment.API_URL}/courses`, product)
      .pipe(retry(3), catchError(handleHttpErrorResponse));
  }

  updateCourse(id: string, changes: Partial<ICourse>): Observable<any> {
    return this.http
      .put(`${environment.API_URL}/courses/${id}`, changes)
      .pipe(retry(3), catchError(handleHttpErrorResponse));
  }

  deleteCourse(id: string): Observable<any> {
    return this.http
      .delete(`${environment.API_URL}/courses/${id}`)
      .pipe(retry(3), catchError(handleHttpErrorResponse));
  }
}
