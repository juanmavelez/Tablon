import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CourseService } from '@core/services/course/course.service';
import { UserCoursesService } from '@core/services/user-courses/user-courses.service';
import { UserService } from '@core/services/user/user.service';

import { IResponseCourse, IUserCourse } from '@core/models/course.model';
import { IResponseUser } from '@core/models/user.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course$: Observable<IResponseCourse>;
  teacher$: Observable<IResponseUser>;
  userCoursesId: IUserCourse[];
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
    this.teacher$ = this.course$.subscribe((result) => {
      this.userService.getUser(result.data.teacher);
    });
  }
  private fetchUserCourses(): void {
    const userId = localStorage.getItem('id');
    this.userCoursesService.getUserCoursesId(userId).subscribe((data) => {
      this.userCoursesId = data.data;
    });
  }

  private userHasCourse = (): boolean => {
    for (const course of this.userCoursesId) {
      if (course.courses_id === this.courseId) {
        this.userCourse = course;
        return true;
      }
    }
    return false;
  };

  createUserCourse(): void {
    const userId = localStorage.getItem('id');
    this.userCoursesService.createUserCourse(userId, this.courseId);
  }

  deleteUserCourse(): void {
    if (this.userHasCourse) {
      this.userCoursesService.deleteUserCourse(this.userCourse._id);
    }
  }

  deleteLesson(): void {}
}
