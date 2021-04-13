import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { IUser } from '@core/models/user.model';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: IUser;
  userId: string = localStorage.getItem('id');
  router$: Observable<any>;
  title: string;

  constructor(public router: Router) {
    this.router$ = router.events.pipe(filter((e) => e instanceof RouterEvent));
  }

  ngOnInit(): void {
    this.router$.pipe(
      tap((e) => {
        console.log(e);
        this.titleSwtich(e.url);
      })
    );
  }

  private titleSwtich(url: string): void {
    switch (url) {
      case '7home':
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
