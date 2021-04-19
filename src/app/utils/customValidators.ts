import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

export function patternValidator(
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    const valid = regex.test(control.value);
    valid ? console.log(error) : console.log({ error: false });
    return valid ? null : error;
  };
}
