import { Component, OnInit, Input } from '@angular/core';
import { ITag } from '@core/models/tags.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() tag: ITag;
  showtag = false;
  showLenguages = false;
  showFrameworks = false;
  showArquitecture = false;
  showPreprocessors = false;
  filterList: string[];

  constructor() {}

  ngOnInit(): void {}

  addElement(name: string): void {
    if (this.filterList.includes(name)) {
      this.filterList = this.filterList.filter((names) => names !== name);
    } else {
      this.filterList.push(name);
    }
  }
}
