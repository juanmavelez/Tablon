import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { CourseService } from '@core/services/course/course.service';
import { UserCoursesService } from '@core/services/user-courses/user-courses.service';
import { UserService } from '@core/services/user/user.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { GravatarService } from '@core/services/gravatar/gravatar.service';

import { IResponseCourse } from '@core/models/course.model';
import {
  IResponseUserCoursesId,
  IUserCourse,
} from '@core/models/user-courses.model';
import { IResponseUser } from '@core/models/user.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course$: Observable<IResponseCourse>;
  teacher$: Observable<IResponseUser>;
  userCourses$: Observable<IResponseUserCoursesId>;
  userCourse: IUserCourse;
  hasCourse: boolean;
  courseId: string;
  userId: string;
  url: string;

  constructor(
    private courseService: CourseService,
    private userCoursesService: UserCoursesService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private gravatarService: GravatarService
  ) {
    this.userId = this.localStorageService.getItem('id');
    this.url = this.gravatarService.createGravatarUrl(this.userId);
  }

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
    this.userCourses$ = this.userCoursesService
      .getUserCoursesId({ user_id: this.userId })
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
    this.userCoursesService
      .createUserCourse(this.userId, this.courseId)
      .subscribe();
    this.fetchUserCourses();
  }

  deleteUserCourse(): void {
    this.userCoursesService.deleteUserCourse(this.userCourse._id).subscribe();
    this.fetchUserCourses();
  }
}
