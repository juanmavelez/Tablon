import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IResponseCourses } from '@core/models/course.model';
import { CourseService } from '@core/services/course/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<IResponseCourses>;
  showFilters = false;
  filterList: string[] = [];
  coursesId: boolean;

  constructor(private courseService: CourseService) {
    this.filterList = [];
  }

  ngOnInit(): void {
    this.courses$ = this.courseService.getAllCourses().pipe();
  }

  addElementToFilter(name: string): void {
    if (this.filterList.includes(name)) {
      this.filterList = this.filterList.filter((names) => names !== name);
    } else {
      this.filterList.push(name);
    }
  }

  /**
   * @returns true array2 is inside array1, false if not
   */
  arrayContainsArray(array1: string[], array2: string[]): boolean {
    if (!array2 || array2.length === 0) {
      return true;
    }
    if (array2.length > array1.length) {
      return false;
    }
    for (const element of array2) {
      if (array1.includes(element) === false) {
        return false;
      }
    }
    return true;
  }
}
