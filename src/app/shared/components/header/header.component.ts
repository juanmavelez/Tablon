import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { IUser } from '@core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: IUser;
  userId: string;
  router$: Observable<any>;
  title: string;
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.userId = this.localStorageService.getItem('id');
  }

  ngOnInit(): void {}
}
