import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
  },
  {
    path: 'id',
    component: CourseDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
