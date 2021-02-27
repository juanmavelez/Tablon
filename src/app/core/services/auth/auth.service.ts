import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignInRequest } from '@core/models/signInRequest.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const authorizationData = 'Basic ' + btoa(`${email}:${password}`);
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'appplication/json',
        Authorization: authorizationData,
      }),
    };

    return this.http.post<ISignInRequest>('/auth/sign-in', '', headerOptions);
  }
}
