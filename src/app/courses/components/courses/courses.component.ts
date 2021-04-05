import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from '@core/models/course.model';
import { IUser } from '@core/models/user.model';
import { GravatarService } from '@core/services/gravatar/gravatar.service';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  @Input() course: ICourse;
  teacher: IUser;
  url: string;

  constructor(
    private userService: UserService,
    private gravatarService: GravatarService
  ) {}
  ngOnInit(): void {
    this.userService.getUser(this.course.teacher).subscribe((response) => {
      this.teacher = response.data;
    });
    this.url = this.createURL(this.course.teacher);
  }

  createURL(teacherEmail: string): string {
    const url = this.gravatarService.createGravatarUrl(teacherEmail);
    return url;
  }
}
