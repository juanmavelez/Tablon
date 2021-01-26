import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonsRoutingModule } from './lessons-routing.module';
import { LessonsComponent } from './components/lessons/lessons.component';
import { LessonsListComponent } from './components/lessons-list/lessons-list.component';
import { LessonsDetailComponent } from './components/lessons-detail/lessons-detail.component';


@NgModule({
  declarations: [LessonsComponent, LessonsListComponent, LessonsDetailComponent],
  imports: [
    CommonModule,
    LessonsRoutingModule
  ]
})
export class LessonsModule { }
