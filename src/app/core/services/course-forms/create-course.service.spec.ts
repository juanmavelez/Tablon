import { TestBed } from '@angular/core/testing';

import { CourseFormsService } from './course-forms.service';

describe('CreateCourseService', () => {
  let service: CourseFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
