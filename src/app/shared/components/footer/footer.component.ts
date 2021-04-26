import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  userId: string;
  constructor() {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
  }
}
