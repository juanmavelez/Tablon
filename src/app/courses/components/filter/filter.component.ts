import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';

import { ITag, ITagResponse } from '@core/models/tags.model';
import { TagsService } from '@core/services/tags/tags.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() pressedTag = new EventEmitter<string>();

  tags$: Observable<ITagResponse>;
  tagslist: string[];

  constructor(private tagsService: TagsService) {
    this.tagslist = [];
  }

  ngOnInit(): void {
    this.tags$ = this.tagsService.getAllTags().pipe(
      tap((response) => {
        this.fillTagList(response.data);
      })
    );
  }

  pressTag(name: string): boolean {
    this.pressedTag.emit(name);
    return true;
  }

  fillTagList(tags: ITag[]): string[] {
    if (!tags) {
      return this.tagslist;
    }
    for (const tag of tags) {
      if (tag.lenguages) {
        this.tagslist = this.tagslist.concat(tag.lenguages);
      }
      if (tag.frameworks) {
        this.tagslist = this.tagslist.concat(tag.frameworks);
      }
      if (tag.preprocessors) {
        this.tagslist = this.tagslist.concat(tag.frameworks);
      }
      if (tag.names) {
        this.tagslist = this.tagslist.concat(tag.names);
      }
    }
    return this.tagslist;
  }
}
