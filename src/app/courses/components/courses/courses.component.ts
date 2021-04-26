import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from '@core/models/course.model';
import { GravatarService } from '@core/services/gravatar/gravatar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  @Input() course: ICourse;
  url: string;
  showDescription = false;
  constructor(
    private gravatarService: GravatarService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.url = this.createURL(this.course.teacher);
  }

  createURL(teacherEmail: string): string {
    const url = this.gravatarService.createGravatarUrl(teacherEmail);
    return url;
  }

  goToDetails(): void {
    this.router.navigateByUrl(`/app/courses/${this.course._id}`);
  }
}
