import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserCoursesService } from '@core/services/user-courses/user-courses.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { IResponseCourse } from '@core/models/course.model';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  userId: string;
  userCourses$: Observable<IResponseCourse>;
  constructor(
    private userCoursesService: UserCoursesService,
    private localStorageService: LocalStorageService
  ) {
    this.userId = this.localStorageService.getItem('id');
  }

  ngOnInit(): void {
    this.userCourses$ = this.userCoursesService.getUserCourses(this.userId);
  }
}
