import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '@core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  userId: string;
  constructor(private localStorageService: LocalStorageService) {
    this.userId = this.localStorageService.getItem('id');
  }
  ngOnInit(): void {}
}
