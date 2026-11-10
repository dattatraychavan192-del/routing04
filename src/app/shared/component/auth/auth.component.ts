import { userRole } from './../../model/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { IloginUser, IregisterUser } from '../../model/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLogin: boolean = false;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _http: AuthService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userRole: ['admin', Validators.required],
    });
  }

  get f() {
    return this.authForm.controls;
  }

  changeMode(login: boolean) {
    this.isLogin = login;
    this.submitted = false;
    this.authForm.reset({
      email: '',
      password: '',
      userRole: 'admin',
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    if (this.isLogin) {
      const loginData: IloginUser = {
        email: this.authForm.value.email,
        password: this.authForm.value.password,
      };

      this._http.logIn(loginData).subscribe({
        next: (res) => {
          const authResponse = res as { userRole: string; token: string };
          this._route.navigate(['home']);
          this._http.saveUserRole(authResponse.userRole);
          this._http.saveToken(authResponse.token);
        },
        error: (err) => {
          console.log('Login error:', err.error);
        },
      });
    } else {
      const registerData: IregisterUser = {
        email: this.authForm.value.email,
        password: this.authForm.value.password,
        userRole: this.authForm.value.userRole,
      };

      console.log('Register Payload:', registerData);

      this._http.sign_up(registerData).subscribe({
        next: (res) => {
          console.log('Registration successful:', res);
          this.changeMode(true);
          this._http.saveUserRole(registerData.userRole);
        },
        error: (err) => {
          console.log('Registration error:', err.error);
        },
      });
    }
  }
}
