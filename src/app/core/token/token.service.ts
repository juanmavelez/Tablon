import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private cookieStore = {};
  constructor() {
    this.parseCookies(document.cookie);
  }
  public parseCookies(cookies = document.cookie) {

  }
