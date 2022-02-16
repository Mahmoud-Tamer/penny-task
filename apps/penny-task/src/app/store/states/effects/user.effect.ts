import { HttpErrorHandlingService } from './../../../core/services/http-error-handling.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, concatMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import * as UserActions from '../actions/user.action';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private httpErrorHandler: HttpErrorHandlingService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      concatMap(({ user }) =>
        this.authService.login(user).pipe(
          map((result) => UserActions.loginSuccess({ user: result })),
          catchError(this.httpErrorHandler.handleAsObservable)
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.signup),
      concatMap(({ user }) =>
        this.authService.signUp(user).pipe(
          map((result) => UserActions.signupSuccess({ user: result })),
          catchError(this.httpErrorHandler.handleAsObservable)
        )
      )
    )
  );
}
