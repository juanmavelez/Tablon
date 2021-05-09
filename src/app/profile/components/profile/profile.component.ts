import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { GravatarService } from '@core/services/gravatar/gravatar.service';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userName: string;
  email: string;
  id: string;
  url: string;
  constructor(
    private localStorageService: LocalStorageService,
    private gravatarService: GravatarService,
    private authService: AuthService
  ) {
    this.userName = this.localStorageService.getItem('name');
    this.email = this.localStorageService.getItem('email');
    this.id = this.localStorageService.getItem('id');
    this.url = this.gravatarService.createGravatarUrl(this.id);
  }

  ngOnInit(): void {}

  logOut() {
    this.authService.logout();
  }
}
