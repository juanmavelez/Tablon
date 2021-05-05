import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem(fieldName: string): string {
    return localStorage.getItem(fieldName);
  }
  setItem(fieldName: string, fieldContent: string): boolean {
    localStorage.setItem(fieldName, fieldContent);
    return true;
  }
  removeItem(fieldName: string): boolean {
    localStorage.removeItem(fieldName);
    return true;
  }
}
