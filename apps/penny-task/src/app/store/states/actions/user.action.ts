import { User } from '../../../interfaces/user.interface';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth Page] User Login',
  props<{ user: User }>()
);

export const loginSuccess = createAction(
  '[Auth Page] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth Page] Login Failure',
  props<{ error: any }>()
);

export const signup = createAction(
  '[Auth Page] User Signup',
  props<{ user: User }>()
);

export const signupSuccess = createAction(
  '[Auth Page] Signup Success',
  props<{ user: User }>()
);

export const signupFailure = createAction(
  '[Auth Page] Signup Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth Page] User Logut');
