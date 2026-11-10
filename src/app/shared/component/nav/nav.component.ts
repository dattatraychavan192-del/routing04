import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(
    private _http: AuthService,
    private _route: Router,
  ) {}

  ngOnInit(): void {}

  roles1: Array<string> = ['buyer', 'admin', 'superAdmin'];
  roles2: Array<string> = ['admin', 'superAdmin'];
  roles3: Array<string> = ['superAdmin'];

  get isLoggin() {
    return !!this._http.getToken();
  }

  get userLoggedRole() {
    return this._http.getRole() as string;
  }

  LogOut() {
    this._http.logOut();
    this._route.navigate(['']);
  }
}
