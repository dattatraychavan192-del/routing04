import { AuthService } from './../shared/service/auth.service';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRoleGuard implements CanActivate {
  private _http = inject(AuthService);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    let loggedUserRole: string = this._http.getRole()!;

    let userRoleArray: Array<string> = route.data['userRole'];
    return userRoleArray.includes(loggedUserRole);
  }
}
