import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateCourseService {
  constructor() {}

  objectToArray(objectsArray: object[]): string[] {
    const finalArray = [];
    if (!objectsArray) {
      return finalArray;
    }
    for (const object of objectsArray) {
      finalArray.push(Object.values(object)[0]);
    }
    console.log(finalArray);
    return finalArray;
  }
}
