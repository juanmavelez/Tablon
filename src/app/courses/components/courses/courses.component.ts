import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { GravatarService } from '@core/services/gravatar/gravatar.service';
import { UserService } from '@core/services/user/user.service';

import { ICourse } from '@core/models/course.model';
import { IResponseUser } from '@core/models/user.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  @Input() course: ICourse;
  teacher$: Observable<IResponseUser>;
  url: string;
  colorComponent: string;
  constructor(
    private userService: UserService,
    private gravatarService: GravatarService,
    private router: Router
  ) {
    this.colorComponent = 'red';
  }

  ngOnInit(): void {
    this.url = this.createURL(this.course.teacher);
    this.teacher$ = this.userService.getUser(this.course.teacher);
  }

  createURL(teacherEmail: string): string {
    return this.gravatarService.createGravatarUrl(teacherEmail);
  }
  goToDetails(): void {
    this.router.navigateByUrl(`/app/courses/${this.course._id}`);
  }
}
