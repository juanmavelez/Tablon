import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleHttpErrorResponse(
  error: HttpErrorResponse
): Observable<never> {
  console.log(error);
  return throwError('An error has ocurred');
}
