import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CourseFormsService {
  constructor() {}

  objectToArray(objectsArray: object[]): string[] {
    const finalArray = [];
    if (!objectsArray) {
      return finalArray;
    }
    for (const object of objectsArray) {
      finalArray.push(Object.values(object)[0]);
    }
    return finalArray;
  }

  removeDynamicFormField(
    form: FormGroup,
    formField: string,
    index: number
  ): void {
    (form.get(formField) as FormArray).removeAt(index);
  }
}
