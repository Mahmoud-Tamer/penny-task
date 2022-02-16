import { LoaderService } from '../../core/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/states/actions/user.action';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    public loaderService: LoaderService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  valid(controlName: string, errorName: string) {
    return (
      this.signupForm.get(controlName)!.hasError(errorName) &&
      (this.signupForm.get(controlName)!.dirty ||
        this.signupForm.get(controlName)!.touched)
    );
  }

  submitSignup() {
    const form: User = {
      username: this.signupForm.get('username')?.value,
      password: this.signupForm.get('password')?.value,
    };

    this.store.dispatch(UserActions.signup({ user: form }));
  }

  goToSignUpPage() {}
}
