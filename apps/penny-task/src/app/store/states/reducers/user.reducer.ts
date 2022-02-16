import { createReducer, on } from '@ngrx/store';
import { initialState, adapter } from '../user.state';
import * as UserActions from '../actions/user.action';

export const reducer = createReducer(
  initialState,
  on(UserActions.login, (state) => {
    return { ...state, needAuth: true };
  }),
  on(UserActions.loginSuccess, (state, { user }) => {
    return adapter.addOne(user, { ...state, needAuth: false });
  }),
  on(UserActions.loginFailure, (state, { error }) => {
    return { ...state, needAuth: true, error };
  }),
  on(UserActions.signup, (state) => {
    return { ...state, needAuth: true };
  }),
  on(UserActions.signupSuccess, (state, { user }) => {
    return adapter.addOne(user, { ...state, needAuth: false });
  }),
  on(UserActions.signupFailure, (state, { error }) => {
    return { ...state, needAuth: true, error };
  }),
  on(UserActions.logout, (state) => {
    return { ...state, needAuth: true };
  })
);
