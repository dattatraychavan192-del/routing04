import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IloginUser, IregisterUser } from '../model/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.authBaseUrl;

  constructor(private _http: HttpClient) {}

  sign_up(user: IregisterUser) {
    return this._http.post(`${this.baseUrl}/api/auth/register`, user);
  }

  logIn(user: IloginUser) {
    return this._http.post(`${this.baseUrl}/api/auth/login`, user);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveUserRole(userRole: string) {
    localStorage.setItem('userRole', userRole);
  }

  getRole() {
    return localStorage.getItem('userRole');
  }
}
