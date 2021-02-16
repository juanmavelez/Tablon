import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './services/course/course.service';
import { UserService } from './services/user/user.service';
@NgModule({
  declarations: [CourseService, UserService],
  imports: [CommonModule],
})
export class CoreModule {}
