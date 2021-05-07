import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { CreateCourseService } from '@core/services/create-course/create-course.service';
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
    private createCourseService: CreateCourseService,
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
    console.log('ESTOY DANDOLE CLICK A ESTA MIERDA');
    if (value) {
      value.tags = this.createCourseService.objectToArray(value.tags);
      value.teacher = this.localStorageService.getItem('id');
      this.courseService.createCourse(value).subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('/app/courses'),
          () => (this.createRequest = true);
      });
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
} /*
<form [formGroup]="form" (ngSubmit)="createCourse($event)">
  <mat-card tabindex="0">
    <mat-card-header>
      <mat-card-title>Create your New Course</mat-card-title>
    </mat-card-header>
    <mat-card-content>

      <mat-form-field appearance="none" class="input-small">
        <mat-label>Course name</mat-label>
        <input placeholder="name" formControlName="name" matInput type="name">
      </mat-form-field>

      <mat-form-field appearance="none" class="input-small description">
        <mat-label>Course description</mat-label>
        <textarea matInput placeholder="description" formControlName="description" matInput type="text">
        </textarea>
      </mat-form-field>

      <button class="button-small" type="button" (click)="addLessonsField()">Add leasson</button>
      <div formArrayName="lessons" *ngFor="let lesson of lessonsField.controls,let i = index">
        <div [formGroupName]="i">
          <mat-form-field appearance="none" class="input-small">
            <mat-label>Lesson name</mat-label>
            <input placeholder="name" formControlName="name" matInput type="name">
          </mat-form-field>
          <mat-form-field appearance="none" class="input-small">
            <mat-label>Description</mat-label>
            <input placeholder="description" formControlName="description" matInput type="text">
          </mat-form-field>
        </div>
      </div>

      <button class="button-small" type="button" (click)="addTagsField()">Add tags</button>
      <div formArrayName="tags" *ngFor="let tags of tagField.controls,index as j">
        <div [formGroupName]="j">
          <mat-form-field appearance="none" class="input-small">
            <mat-label>Tags</mat-label>
            <mat-select formControlName="tags">
              <mat-option [value]="tag" *ngFor="let tag of tagList">
                {{tag}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>

    </mat-card-content>
    <mat-card-actions>
      <button class="button-small" type="submit" [disabled]="!form.valid">Create!</button>
    </mat-card-actions>
  </mat-card>
</form>
 -->
 */
