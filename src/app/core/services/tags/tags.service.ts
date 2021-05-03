import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ITagResponse } from '@core/models/tags.model';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  getAllTags(): Observable<ITagResponse> {
    return this.http.get<ITagResponse>(`/tags`).pipe(retry(3));
  }
}
