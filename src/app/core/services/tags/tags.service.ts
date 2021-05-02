import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ITagRequest } from '@core/models/tags.model';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  getAllTags(): Observable<ITagRequest> {
    return this.http.get<ITagRequest>(`/tags`).pipe(retry(3));
  }
}
