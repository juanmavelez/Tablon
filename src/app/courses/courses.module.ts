import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { CreateCoursesComponent } from './components/create-courses/create-courses.component';
import { FilterComponent } from './components/filter/filter.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { EditCoursesComponent } from './components/edit-courses/edit-courses.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    CoursesListComponent,
    UserCoursesComponent,
    CreateCoursesComponent,
    FilterComponent,
    LessonsComponent,
    EditCoursesComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class CoursesModule {}
