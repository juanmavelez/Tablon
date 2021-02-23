import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  setLocalStorage(responseObj) {
    // Adds the expiration time defined on the JWT to the current moment
    const expiresAt = localStorage.setItem('id_token', responseObj.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
