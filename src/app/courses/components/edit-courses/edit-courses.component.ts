import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CourseFormsService } from '@core/services/course-forms/course-forms.service';
import { CourseService } from '@core/services/course/course.service';
import { TagsService } from '@core/services/tags/tags.service';
import { ICourse, IResponseCourse } from '@core/models/course.model';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.scss'],
})
export class EditCoursesComponent implements OnInit {
  course$: Observable<IResponseCourse>;
  tagList: string[];
  form: FormGroup;
  updateRequest: boolean;
  course: ICourse;
  constructor(
    private courseFormsService: CourseFormsService,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private tagsService: TagsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
    this.updateRequest = false;
    this.tagList = [];
  }

  ngOnInit(): void {
    this.fetchTags();
    this.course$ = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        return this.courseService.getCourse(params.id).pipe(
          tap((response) => {
            this.course = response.data;
            this.addingFieldsToPatch(response);
            this.form.patchValue(response.data);
            this.form.patchValue({ tags: this.creatingTagsObjects(response) });
          })
        );
      })
    );
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }
  get description(): AbstractControl {
    return this.form.get('description');
  }

  lessonName(index: number): AbstractControl {
    return this.lessonsField.at(index).get('name');
  }

  lessonDescription(index: number): AbstractControl {
    return this.lessonsField.at(index).get('description');
  }

  tagControl(index: number): AbstractControl {
    return this.tagField.at(index).get('tag');
  }

  updateCourse(event: Event): void {
    event.preventDefault();
    const value = this.form.value;
    if (value) {
      value.tags = this.courseFormsService.objectToArray(value.tags);
      value.teacher = this.course.teacher;
      this.courseService.updateCourse(this.course._id, value).subscribe(
        () => this.router.navigateByUrl('/app/courses'),
        () => (this.updateRequest = true)
      );
    } else {
      console.log('invalid input plis try again ');
    }
  }

  private addingFieldsToPatch(response: IResponseCourse): boolean {
    response.data.lessons.forEach(() => this.addLessonsField());
    response.data.tags.forEach(() => this.addTagsField());
    return true;
  }

  private creatingTagsObjects(response: IResponseCourse): { tag: string }[] {
    const tagsArray: { tag: string }[] = [];
    response.data.tags.forEach((tags) => tagsArray.push({ tag: tags }));
    return tagsArray;
  }

  removeField(field: string, index: number): void {
    this.courseFormsService.removeDynamicFormField(this.form, field, index);
  }
  private fetchTags(): void {
    this.tagsService
      .getAllTags()
      .pipe(
        tap((response) => {
          this.tagList = this.tagsService.createTagList(response.data);
        })
      )
      .subscribe();
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

  // Tags
  private tagsBuildForm(): FormGroup {
    return this.formBuilder.group({
      tag: ['', [Validators.required]],
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
