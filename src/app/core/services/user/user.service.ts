import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

import { Observable } from 'rxjs';

import { IUser, IResponseUser } from '@core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IResponseUser> {
    return this.http.get<IResponseUser>(`${environment.API_URL}/users`);
  }

  getUser(id: string): Observable<IResponseUser> {
    return this.http.get<IResponseUser>(`${environment.API_URL}/users/${id}`);
  }

  createUser(product: IUser): Observable<object> {
    return this.http.post(`${environment.API_URL}/users`, product);
  }

  updateUser(id: string, changes: Partial<IUser>): Observable<any> {
    return this.http.put(`${environment.API_URL}/users/${id}`, changes);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${environment.API_URL}/users/${id}`);
  }
}
