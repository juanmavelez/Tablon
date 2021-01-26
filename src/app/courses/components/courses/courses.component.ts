import { Component, OnInit, Input, Output } from '@angular/core';
import { ICourse } from '@core/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  @Input() course: ICourse;
  courses: ICourse[];

  constructor() {}
  ngOnInit(): void {}
}
