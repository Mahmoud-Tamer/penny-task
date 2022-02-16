import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToasterService } from './toaster.service';
import { HttpErrorHelper } from '../helpers/http-error/http-error.helper';

@Injectable({ providedIn: 'root' })
export class HttpErrorHandlingService {
  constructor(
    private toasterService: ToasterService,
    private authService: AuthService
  ) {
    HttpErrorHelper.toasterService = this.toasterService;
    HttpErrorHelper.authService = this.authService;
  }

  handleAsPromise(error: HttpErrorResponse): Promise<any> {
    const meg = HttpErrorHelper.analyseError(error);
    return throwError(meg).toPromise();
  }

  handleAsObservable(error: HttpErrorResponse): Observable<never> {
    const meg = HttpErrorHelper.analyseError(error);
    return throwError(meg);
  }
}
