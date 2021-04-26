import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { CreateCoursesComponent } from './components/create-courses/create-courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
  },
  {
    path: 'create-course',
    component: CreateCoursesComponent,
  },
  {
    path: 'user/:id',
    component: UserCoursesComponent,
  },
  {
    path: ':id',
    component: CourseDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
