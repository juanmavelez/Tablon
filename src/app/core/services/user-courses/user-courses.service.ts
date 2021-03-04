import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseCourse } from '@core/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class UserCoursesService {
  constructor(private http: HttpClient) {}

  getUserCourses(id: string): Observable<IResponseCourse> {
    return this.http.get<IResponseCourse>(`/user-courses/${id}`);
  }
}
