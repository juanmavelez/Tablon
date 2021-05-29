import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  @Input() chipName: string;
  toogle: boolean;

  constructor() {
    this.toogle = false;
  }

  ngOnInit(): void {}
}
