import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, forkJoin, observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CourseService } from '@core/services/course/course.service';
import { UserCoursesService } from '@core/services/user-courses/user-courses.service';
import { IResponseCourse, IUserCourse } from '@core/models/course.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course$: Observable<IResponseCourse>;
  userCoursesId: IUserCourse[];
  courseId: string;
  hasCourse: Observable<boolean>;

  constructor(
    private courseService: CourseService,
    private userCoursesService: UserCoursesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchCourse();
    this.fetchUserCourses();
  }

  private fetchCourse(): void {
    this.course$ = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        this.courseId = params.id;
        return this.courseService.getCourse(params.id);
      })
    );
  }

  private fetchUserCourses(): void {
    const userId = localStorage.getItem('id');
    console.log(this.userCoursesId);
    this.userCoursesService.getUserCoursesId(userId).subscribe((data) => {
      this.userCoursesId = data.data;
    });
  }

  private userHasCourse = (): boolean => {
    for (const course of this.userCoursesId) {
      if (course.courses_id === this.courseId) {
        return true;
      }
    }
    return false;
  };
}
