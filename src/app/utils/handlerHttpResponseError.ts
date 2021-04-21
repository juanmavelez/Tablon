import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleHttpErrorResponse(
  error: HttpErrorResponse
): Observable<never> {
  const styledError = { statusCode: error.status, message: error.statusText };
  return throwError(styledError);
}
