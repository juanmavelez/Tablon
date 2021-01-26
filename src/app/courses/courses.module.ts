import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './components/courses/courses.component';
import { MaterialModule } from '@material/material.module';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    CoursesListComponent,
  ],
  imports: [CommonModule, CoursesRoutingModule, MaterialModule],
})
export class CoursesModule {}
