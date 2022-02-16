import { LoaderService } from '../../core/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/states/actions/user.action';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    public loaderService: LoaderService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  valid(controlName: string, errorName: string) {
    return (
      this.loginForm.get(controlName)!.hasError(errorName) &&
      (this.loginForm.get(controlName)!.dirty ||
        this.loginForm.get(controlName)!.touched)
    );
  }

  submitLogin() {
    const form: User = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.store.dispatch(UserActions.login({ user: form }));
  }

  goToSignUpPage() {
    this.router.navigate(['/signup']);
  }
}
