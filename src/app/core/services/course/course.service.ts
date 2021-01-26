import { Injectable } from '@angular/core';
import { ICourse } from '../models/course.model';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses: ICourse[] = [
    {
      id: '00001',
      name: 'Course Name',
      teacher: 'WierdTeacher',
      description: 'This is a moak of a course',
      date: '13/12/1994',
    },
    {
      id: '00002',
      name: 'Course Name2',
      teacher: 'WierdTeacher2',
      description: 'This is a moak of a course2',
      date: '13/12/1994',
    },
    {
      id: '00003',
      name: 'Course Name3',
      teacher: 'WierdTeacher',
      description: 'This is a moak of a course3',
      date: '13/12/1994',
    },
  ];

  getAllCourses(): ICourse[] {
    return this.courses;
  }
  getCourse(idCourse: string): ICourse {
    return this.courses.find((course) => (course.id = idCourse));
  }
  constructor() {}
}
