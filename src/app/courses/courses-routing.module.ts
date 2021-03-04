import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
  },
  {
    path: 'id',
    component: CourseDetailsComponent,
  },
  {
    path: 'user/:id',
    component: UserCoursesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
