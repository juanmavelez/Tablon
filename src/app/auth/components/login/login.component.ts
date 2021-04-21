import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.error = false;
    this.buildForm();
  }

  ngOnInit(): void {}

  login(event: Event): void {
    event.preventDefault();
    const value = this.form.value;
    if (value) {
      const login$ = this.authService.login(value.email, value.password);
      login$.subscribe(
        (res) => {
          console.log(res);
          this.router.navigateByUrl('/app');
        },
        (err) => {
          console.log(err);
          this.error = true;
        }
      );
    } else {
      console.log('invalid input plis try again ');
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ],
      ],
    });
  }
  getError(): boolean {
    return this.error;
  }
}
