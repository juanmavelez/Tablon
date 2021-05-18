import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { IUser, IResponseUser } from '@core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IResponseUser> {
    return this.http.get<IResponseUser>(`/users-proxy`).pipe(retry(3));
  }

  getUser(id: string): Observable<IResponseUser> {
    return this.http.get<IResponseUser>(`/users-proxy/${id}`).pipe(retry(3));
  }

  updateUser(id: string, changes: Partial<IUser>): Observable<any> {
    return this.http.put(`/users-proxy/${id}`, changes).pipe(retry(3));
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`/users-proxy/${id}`).pipe(retry(3));
  }
}
