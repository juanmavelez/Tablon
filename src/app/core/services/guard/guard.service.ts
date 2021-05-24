import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  cookie: string;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    this.cookie = '';
  }

  canActivate(): boolean {
    this.cookie = this.document.cookie;
    if (this.cookie) {
      return true;
    }
    this.router.navigateByUrl('auth/login');
    return false;
  }
}
