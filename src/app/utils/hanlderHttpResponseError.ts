import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import * as Sentry from '@sentry/browser';

export function handleHttpErrorResponse(
  error: HttpErrorResponse
): Observable<never> {
  console.log(error);
  Sentry.captureException(error);
  return throwError('An error has ocurred');
}
