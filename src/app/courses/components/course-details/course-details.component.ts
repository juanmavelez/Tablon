import { Component, OnInit } from '@angular/core';
import { CourseService } from '@core/services/course.service';
import { ICourse } from '@core/models/course.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course: ICourse;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.course = this.courseService.getCourse(id);
    });
  }
}
