import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { ITagResponse, ITag } from '@core/models/tags.model';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  getAllTags(): Observable<ITagResponse> {
    return this.http.get<ITagResponse>(`/tags`).pipe(retry(3));
  }

  createTagList(tags: ITag[]): string[] {
    let tagslist = [];

    if (!tags) {
      return tagslist;
    }
    for (const tag of tags) {
      if (tag.lenguages) {
        tagslist = tagslist.concat(tag.lenguages);
      }
      if (tag.frameworks) {
        tagslist = tagslist.concat(tag.frameworks);
      }
      if (tag.preprocessors) {
        tagslist = tagslist.concat(tag.frameworks);
      }
      if (tag.names) {
        tagslist = tagslist.concat(tag.names);
      }
    }
    return tagslist;
  }
}
