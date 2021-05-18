import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  cookie: string;
  constructor(private router: Router) {
    this.cookie = '';
  }
  canActivate(): boolean {
    this.cookie = document.cookie;
    if (this.cookie) {
      return true;
    }
    this.router.navigateByUrl('auth/login');
    return false;
  }
}
