import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISignUpRequest } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  register(event: Event): any {
    event.preventDefault();
    const value = this.form.value;
    const user: ISignUpRequest = value;
    console.log('user', user);
    if (value) {
      this.authService.register(user).subscribe();
    } else {
      console.log('invalid input plis try again ');
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
