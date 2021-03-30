import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ISignUpRequest } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth/auth.service';
import { patternValidator } from '@utils/customValidators';
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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          new FormControl(patternValidator(/\d/, { hasNumber: true })),
          new FormControl(patternValidator(/[A-Z]/, { hasCapitalCase: true })),
          new FormControl(patternValidator(/[a-z]/, { hasSmallCase: true })),
          new FormControl(
            patternValidator(/!@#$%^&*()_\+\-=[\]{};':"|,.<>/?¿[\]]+/, {
              hasSpecialCharacters: true,
            })
          ),
        ],
      ],
    });
  }
}
