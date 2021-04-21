import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignInRequest, ISignUpRequest } from '@core/models/auth.model';
import { tap } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
/* import { handleHttpErrorResponse } from '@utils/handlerHttpResponseError'; */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
          console.log(response);
          localStorage.setItem('name', response.user.name);
          localStorage.setItem('email', response.user.email);
          localStorage.setItem('id', response.user.id);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    document.cookie = 'token=; Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  register(user: ISignUpRequest): Observable<ISignUpRequest> {
    return this.http
      .post<ISignUpRequest>('/auth/register', user)
      .pipe(retry(3));
  }
}
