import { Component, OnInit } from '@angular/core';
import { ICourse } from '@core/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}
}
