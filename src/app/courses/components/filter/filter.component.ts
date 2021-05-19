import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';

import { ITag, ITagResponse } from '@core/models/tags.model';
import { TagsService } from '@core/services/tags/tags.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        this.tagslist = this.tagsService.createTagList(response.data);
      })
    );
  }

  pressTag(name: string): boolean {
    this.pressedTag.emit(name);
    return true;
  }
}
