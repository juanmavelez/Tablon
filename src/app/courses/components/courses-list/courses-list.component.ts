import { Component, OnInit } from '@angular/core';
import { ICourse } from '@core/models/course.model';
import { CourseService } from '@core/services/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses: ICourse[];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }
  fetchCourses(): void {
    this.courses = this.courseService.getAllCourses();
  }
}
