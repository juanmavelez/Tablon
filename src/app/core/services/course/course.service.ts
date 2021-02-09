import { Injectable } from '@angular/core';
import { ICourse } from '../../models/course.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  /*    courses: ICourse[] = [
    {
      id: '00001',
      name: 'Course Name',
      teacher: 'teacher1',
      lessons: [
        { name: 'class1', description: 'this is the first class' },
        { name: 'class2', description: 'this is the second class' },
        { name: 'class3', description: 'this is the third class' },
      ],
      tags: ['music', 'mathe', 'biologi'],
      students: ['1', '2', '3', '4'],
      description: 'description 1',
    },
    {
      id: '00002',
      name: 'Course Name two',
      teacher: 'teacher2',
      lessons: [
        { name: 'class1', description: 'this is the first class' },
        { name: 'class2', description: 'this is the second class' },
        { name: 'class3', description: 'this is the third class' },
      ],
      tags: ['music', 'mathe', 'biologi'],
      students: ['1', '2', '3', '4'],
      description: 'description 2',
    },
    {
      id: '00001',
      name: 'Course Name 3',
      teacher: 'teacher1',
      lessons: [
        { name: 'class1', description: 'this is the first class' },
        { name: 'class2', description: 'this is the second class' },
        { name: 'class3', description: 'this is the third class' },
      ],
      tags: ['music', 'mathe', 'biologi'],
      students: ['1', '2', '3', '4'],
      description: 'description 3',
    },
  ]; */

  /*   getAllCourses(): ICourse[] {
    return this.courses;
  }
  getCourse(idCourse: string): ICourse {
    return this.courses.find((course) => (course.id = idCourse));
  } */
  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${environment.API_URL}/courses`);
  }

  getCourse(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`${environment.API_URL}/${id}`);
  }

  createCourse(product: ICourse): Observable<object> {
    return this.http.post(`${environment.API_URL}`, product);
  }

  updateCourse(id: string, changes: Partial<ICourse>): Observable<any> {
    return this.http.put(`${environment.API_URL}/${id}`, changes);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${environment.API_URL}/${id}`);
  }
}
