import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUsersComponent } from './course-users.component';

describe('CourseUsersComponent', () => {
  let component: CourseUsersComponent;
  let fixture: ComponentFixture<CourseUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
