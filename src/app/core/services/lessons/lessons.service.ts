import { Injectable } from '@angular/core';
import { ILesson } from '@core/models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  lessons: ILesson[] = [
    {
      id: '00001',
      name: 'class Name',
      teacher: 'WierdTeacher',
      description: 'This is a moak of a class',
      content: ['maths', 'physics', 'leopoldo'],
    },
    {
      id: '00002',
      name: 'class Name2',
      teacher: 'WierdTeacher2',
      description: 'This is a moak of a class',
      content: ['maths', 'physics', 'leopoldo'],
    },
    {
      id: '00003',
      name: 'class Name3',
      teacher: 'WierdTeacher',
      description: 'This is a moak of a class',
      content: ['maths', 'physics', 'leopoldo'],
    },
  ];
  constructor() {}

  getAllLessons(): ILesson[] {
    return this.lessons;
  }
  getCourse(idLesson: string): ILesson {
    return this.lessons.find((lesson) => (lesson.id = idLesson));
  }
}
