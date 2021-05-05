import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '@core/services/course/course.service';
import { patternValidator } from '@utils/customValidators';

@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.scss'],
})
export class CreateCoursesComponent implements OnInit {
  lessons = [];
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  createCourse(event: Event): any {
    event.preventDefault();
    const value = this.form.value;
    if (value) {
      console.log(value);
    } else {
      console.log('invalid input plis try again ');
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
    });
  }

  addCounter(): void {
    this.lessons.push(`lesson ${this.lessons.length}`);
  }
}
