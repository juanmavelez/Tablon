import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';

import { CourseService } from '@core/services/course/course.service';
import { UserCoursesService } from '@core/services/user-courses/user-courses.service';
import { UserService } from '@core/services/user/user.service';

import {
  IResponseCourse,
  IResponseCourseId,
  IUserCourse,
} from '@core/models/course.model';
import { IResponseUser } from '@core/models/user.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course$: Observable<IResponseCourse>;
  teacher$: Observable<IResponseUser>;
  userCourses$: Observable<IResponseCourseId>;
  userCourse: IUserCourse;
  hasCourse: boolean;
  courseId: string;

  constructor(
    private courseService: CourseService,
    private userCoursesService: UserCoursesService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchCourse();
    this.fetchUserCourses();
    this.fetchTeacher();
  }

  private fetchCourse(): void {
    this.course$ = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        this.courseId = params.id;
        return this.courseService.getCourse(params.id);
      })
    );
  }
  private fetchTeacher(): void {
    this.teacher$ = this.course$.pipe(
      switchMap((response) => {
        return this.userService.getUser(response.data.teacher);
      })
    );
  }

  private fetchUserCourses(): void {
    const userId = localStorage.getItem('id');
    this.userCourses$ = this.userCoursesService
      .getUserCoursesId(userId)
      .pipe(
        tap((response) => (this.hasCourse = this.userHasCourse(response.data)))
      );
  }

  private userHasCourse(courses: IUserCourse[]): boolean {
    for (const course of courses) {
      if (course.courses_id === this.courseId) {
        this.userCourse = course;
        return true;
      }
    }
    return false;
  }

  createUserCourse(): void {
    console.log('adding course');
    const userId = localStorage.getItem('id');
    this.userCoursesService
      .createUserCourse(userId, this.courseId)
      .pipe(take(1))
      .subscribe();
    this.fetchUserCourses();
  }

  deleteUserCourse(): void {
    console.log('deleting course');
    this.userCoursesService
      .deleteUserCourse(this.userCourse._id)
      .pipe(take(1))
      .subscribe();
    this.fetchUserCourses();
  }

  deleteLesson(): void {}
}
