import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  validated: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const helper = new JwtHelperService();
    const currentUser = this.authService.currentUserValue;

    if (!helper.isTokenExpired(currentUser.token)) {
      return true;
    }

    this.router.navigate(['login'], {
      queryParams: { returnUrl: state.url },
    });
    this.authService.logout();
    return false;
  }
}
