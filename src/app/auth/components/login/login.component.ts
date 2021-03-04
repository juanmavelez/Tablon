import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  login(event: Event): any {
    event.preventDefault();
    const value = this.form.value;
    if (value) {
      this.authService.login(value.email, value.password).subscribe();
    } else {
      console.log('invalid input plis try again ');
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
