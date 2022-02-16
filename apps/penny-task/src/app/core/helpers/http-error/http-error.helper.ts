import { HttpErrorResponse } from '@angular/common/http';

export class HttpErrorHelper {
  static toasterService: any;
  static authService: any;

  static analyseError(error: HttpErrorResponse): string {
    const userFacingMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
    } else {
      switch (error.status) {
        case undefined:
        case 0:
        case 500:
          this.connectionRefused(error);
          break;

        case 403:
          break;

        case 401:
          this.connectionUnauthorized(error);
          break;

        case 400:
          this.badRequest(error);
          break;

        default:
          this.UnhandlingError(error);
          break;
      }
    }

    return userFacingMessage;
  }

  static connectionRefused(error: HttpErrorResponse): void {
    const userFacingMessage = 'server not reachable';

    this.toasterService.error(userFacingMessage);
  }

  static connectionUnauthorized(error: HttpErrorResponse): void {
    const userFacingMessage = '...';
    this.toasterService.error(userFacingMessage);
    console.log(error);

    this.authService.logout();
  }

  static badRequest(error: HttpErrorResponse): void {
    let errors = [];
    if (!error.error) {
      return;
    }

    if (error.error instanceof Blob) {
      error.error.text().then((data) => {
        errors = this.extractErrorMessages({ error: JSON.parse(data) });
        this.toasterService.error(errors.join(','));
      });
    } else {
      errors = this.extractErrorMessages(error);
      this.toasterService.error(errors.join(','));
    }
  }

  static UnhandlingError(error: HttpErrorResponse): void {
    const msg = error.message ? error.message : error;
    this.toasterService.warning(msg + `default Error! (${error.status})`);
  }

  static extractErrorMessages(error: any): Array<string> {
    const arr = new Array<string>();
    Object.entries(error.error.errors).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        arr.push(...value);
      } else if (typeof value === 'string') {
        arr.push(value);
      }
    });
    return arr;
  }
}
