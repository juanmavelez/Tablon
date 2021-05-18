import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hasError = false;
  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  login(event: Event): void {
    event.preventDefault();
    const value = this.form.value;
    this.form.markAllAsTouched();
    if (value) {
      this.authService.login(value.email, value.password).subscribe(
        () => this.router.navigateByUrl('/app'),
        () => (this.hasError = true)
      );
    } else {
      this.loginError = true;
    }
  }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
}
