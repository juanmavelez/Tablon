import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import {
  ICourse,
  IResponseCourse,
  IResponseCourses,
} from '@core/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<IResponseCourses> {
    return this.http.get<IResponseCourses>(`/courses`);
  }

  getCourse(id: string): Observable<IResponseCourse> {
    return this.http.get<IResponseCourse>(`/courses/${id}`);
  }

  createCourse(product: ICourse): Observable<object> {
    return this.http.post(`${environment.API_URL}/courses`, product);
  }

  updateCourse(id: string, changes: Partial<ICourse>): Observable<any> {
    return this.http.put(`${environment.API_URL}/courses/${id}`, changes);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${environment.API_URL}/courses/${id}`);
  }
}
