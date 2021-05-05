import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

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
    public router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.router$ = router.events.pipe(filter((e) => e instanceof RouterEvent));
    this.userId = this.localStorageService.getItem('id');
  }

  ngOnInit(): void {
    this.router$.pipe(
      tap((e) => {
        console.log(e);
        console.log(e.url);
        this.titleSwtich(e.url);
      })
    );
  }

  private titleSwtich(url: string): void {
    switch (url) {
      case '/home':
        this.title = 'home';
        break;
      case '/courses':
        this.title = 'courses';
        break;
      case `/courses/${this.userId}`:
        this.title = 'My Courses';
        break;
      case '/profile':
        this.title = 'Profile';
        break;
      case 'new-course':
        this.title = 'Create Course';
        break;
    }
  }
}
