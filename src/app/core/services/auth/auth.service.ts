import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ISignInRequest, ISignUpRequest } from '@core/models/auth.model';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<ISignInRequest> {
    const authorizationData = 'Basic ' + btoa(`${email}:${password}`);
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'appplication/json',
        Authorization: authorizationData,
      }),
    };
    return this.http
      .post<ISignInRequest>('/auth/sign-in', '', headerOptions)
      .pipe(
        retry(3),
        tap((response) => {
          this.localStorageService.setItem('name', response.user.name);
          this.localStorageService.setItem('email', response.user.email);
          this.localStorageService.setItem('id', response.user.id);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    document.cookie = 'token=; Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.router.navigateByUrl('/home');
  }

  register(user: ISignUpRequest): Observable<ISignUpRequest> {
    return this.http
      .post<ISignUpRequest>('/auth/register', user)
      .pipe(retry(3));
  }
}
