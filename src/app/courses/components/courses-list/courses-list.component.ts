import { Component, OnInit } from '@angular/core';
import { IResponseCourses } from '@core/models/course.model';
import { CourseService } from '@core/services/course/course.service';
import { Observable } from 'rxjs';
import { TagsService } from '@core/services/tags/tags.service';
import { ITagResponse } from '@core/models/tags.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  tags$: Observable<ITagResponse>;
  courses$: Observable<IResponseCourses>;
  coursesId: boolean;

  showFilter = false;

  constructor(
    private courseService: CourseService,
    private tagsService: TagsService
  ) {}

  ngOnInit(): void {
    this.courses$ = this.courseService.getAllCourses();
    this.tags$ = this.tagsService.getAllTags();
    this.tags$.subscribe((arg) => console.log(arg));
  }
}
