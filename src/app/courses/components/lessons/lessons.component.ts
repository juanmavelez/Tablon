import { Component, OnInit, Input } from '@angular/core';
import { ILesson } from '@core/models/lesson.model';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class LessonsComponent implements OnInit {
  @Input() lesson: ILesson;
  showDescription: boolean;
  constructor() {
    this.showDescription = false;
  }

  ngOnInit(): void {}
}
