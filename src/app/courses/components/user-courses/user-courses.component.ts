import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserCoursesService } from '@core/services/user-courses/user-courses.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { IResponseCourses, ICourse } from '@core/models/course.model';


@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  userId: string;
  userCourses$: Observable<IResponseCourses>;
  constructor(
    private userCoursesService: UserCoursesService,
    private localStorageService: LocalStorageService
  ) {
    this.userId = this.localStorageService.getItem('id');
  }

  ngOnInit(): void {
    this.userCourses$ = this.userCoursesService.getUserCourses(this.userId);
  }
  userIsTeacherOf(array1: ICourse[]) :ICourse[]{
    return array1.filter(item => item.teacher === this.userId )
  }
  userIsStudentOf(array1: ICourse[]): ICourse[]{
    return array1.filter(item => item.teacher !== this.userId )
  }
}
