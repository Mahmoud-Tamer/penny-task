import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'apps/penny-task/src/environments/environment';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api: string = environment.base_url + environment.base_api_route;

  constructor(private http: HttpClient, private router: Router) {}
  login(user: Partial<User>) {
    return this.http.post<User>(`${this.api}/auth/signIn`, user).pipe(
      mergeMap((user: User) => {
        this.token = user.access_token || '';
        this.router.navigate(['portal']);
        return of(user);
      })
    );
  }

  signUp(user: Partial<User>) {
    return this.http.post<User>(`${this.api}/auth/signUp`, user).pipe(
      mergeMap((user: User) => {
        this.token = user.access_token || '';
        this.router.navigate(['portal']);
        return of(user);
      })
    );
  }

  get token() {
    return localStorage.getItem('access_token') || '';
  }

  set token(val: string) {
    if (val.length > 0) {
      localStorage.setItem('access_token', val);
    }
  }

  isAuthenticated() {
    return localStorage.getItem('access_token') ? true : false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
