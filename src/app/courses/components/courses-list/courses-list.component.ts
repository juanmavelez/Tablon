import { Component, OnInit } from '@angular/core';
import { IResponseCourses } from '@core/models/course.model';
import { CourseService } from '@core/services/course/course.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<IResponseCourses>;
  coursesId: boolean;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses$ = this.courseService.getAllCourses();
  }
}
