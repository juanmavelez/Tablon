import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { CourseFormsService } from '@core/services/course-forms/course-forms.service';
import { CourseService } from '@core/services/course/course.service';
import { TagsService } from '@core/services/tags/tags.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.scss'],
})
export class CreateCoursesComponent implements OnInit {
  currentList: string[];
  formTagList: string[];
  tagList: string[];
  form: FormGroup;
  createRequest: boolean;

  constructor(
    private courseFormsService: CourseFormsService,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private tagsService: TagsService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.buildForm();
    this.createRequest = false;
    this.tagList = [];
  }

  ngOnInit(): void {
    this.tagsService
      .getAllTags()
      .pipe(
        tap((response) => {
          this.tagList = this.tagsService.createTagList(response.data);
        })
      )
      .subscribe();
  }

  createCourse(event: Event): void {
    event.preventDefault();
    const value = this.form.value;
    if (value) {
      value.tags = this.courseFormsService.objectToArray(value.tags);
      value.teacher = this.localStorageService.getItem('id');
      this.courseService.createCourse(value).subscribe(
        () => this.router.navigateByUrl('/app/courses'),
        () => (this.createRequest = true)
      );
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
          Validators.minLength(10),
          Validators.maxLength(200),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      lessons: this.formBuilder.array([]),
      tags: this.formBuilder.array([]),
    });
  }

  // Lessons
  private lessonsBuildForm(): FormGroup {
    return this.formBuilder.group({
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
          Validators.minLength(4),
          Validators.maxLength(200),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
    });
  }

  get lessonsField(): FormArray {
    return this.form.get('lessons') as FormArray;
  }

  addLessonsField(): boolean {
    this.lessonsField.push(this.lessonsBuildForm());
    return true;
  }

  removeField(field: string, index: number): void {
    this.courseFormsService.removeDynamicFormField(this.form, field, index);
  }

  // Tags
  private tagsBuildForm(): FormGroup {
    return this.formBuilder.group({
      tags: ['', [Validators.required]],
    });
  }

  get tagField(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  addTagsField(): boolean {
    this.tagField.push(this.tagsBuildForm());
    return true;
  }
}
