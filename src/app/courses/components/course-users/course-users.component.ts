import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { UserCoursesService } from '@core/services/user-courses/user-courses.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';

import { IResponseUsers } from '@core/models/course.model';
import { IUser } from '@core/models/user.model';

@Component({
  selector: 'app-course-users',
  templateUrl: './course-users.component.html',
  styleUrls: ['./course-users.component.scss'],
})
export class CourseUsersComponent implements OnInit {
  users$: Observable<IResponseUsers>;
  courseId: string;
  deletingUser: boolean;
  userId: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userCoursesService: UserCoursesService,
    private localStorageService: LocalStorageService
  ) {
    this.userId = this.localStorageService.getItem('id');
    this.deletingUser = false;
  }

  ngOnInit(): void {
    this.users$ = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        this.courseId = params.id;
        return this.userCoursesService
          .getCourseUsers(this.courseId)
          .pipe(tap((response) => console.log(response)));
      })
    );
  }

  deleteUserCourse(user: IUser): void {
    const params = { user_id: user._id, courses_id: this.courseId };
    this.userCoursesService
      .getUserCoursesId(params)
      .pipe(
        switchMap((response) => {
          return this.userCoursesService.deleteUserCourse(response.data[0]._id);
        })
      )
      .subscribe(
        () => (this.deletingUser = false),
        () => (this.deletingUser = true)
      );
  }
}
