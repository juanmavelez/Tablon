import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/models/user.model';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: IUser;
  userId: string = localStorage.getItem('id');
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUser();
  }
  fetchUser(): void {
    /*     this.userService
      .getUser('6021681d5f0b23994c0c3477')
      .subscribe((response) => (this.user = response.data)); */
  }
}
