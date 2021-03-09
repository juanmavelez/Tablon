import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserCoursesService } from '@core/services/user-courses/user-courses.service';
import { IResponseCourse } from '@core/models/course.model';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  userCourses$: Observable<IResponseCourse>;

  constructor(
    private userCoursesService: UserCoursesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchuserCourses();
  }

  private fetchuserCourses(): void {
    this.userCourses$ = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        return this.userCoursesService.getUserCourses(params.id);
      })
    );
  }
}
