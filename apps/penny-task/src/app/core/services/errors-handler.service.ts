import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppErrorsHandler implements ErrorHandler {
  constructor() {}
  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // alert(error.error.message);

      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
      } else {
        // Handle Http Error (error.status === 403, 404...)
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
    }

    // Log the error anyway
    // console.error('It happens: ', error);
    return throwError(error.message);
  }
}
