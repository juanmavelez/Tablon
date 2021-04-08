import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { CourseService } from '@core/services/course/course.service';
import { UserCoursesService } from '@core/services/user-courses/user-courses.service';
import { UserService } from '@core/services/user/user.service';

import {
  IResponseCourse,
  IResponseCourseId,
  IUserCourse,
} from '@core/models/course.model';
import { IResponseUser } from '@core/models/user.model';
import { response } from 'express';

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
  }

  private fetchCourse(): void {
    this.course$ = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          this.courseId = params.id;
          return this.courseService.getCourse(params.id);
        })
      )
      .pipe(
        tap((response) => {
          this.teacher$ = this.userService.getUser(response.data.teacher);
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
        console.log('I HAVE THE COURSE');
        return true;
      }
    }
    console.log('I dont have the course =(');
    return false;
  }

  createUserCourse(): void {
    const userId = localStorage.getItem('id');
    this.userCoursesService
      .createUserCourse(userId, this.courseId)
      .subscribe((response) => console.log(response));
  }

  deleteUserCourse(): void {
    console.log('removing course');
    this.userCoursesService.deleteUserCourse(this.userCourse._id).pipe(
      tap((response) => {
        console.log(response.data);
        this.hasCourse = !this.hasCourse;
      })
    );
  }

  deleteLesson(): void {}
}
