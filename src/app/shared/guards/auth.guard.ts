import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (user && !this.accountService.isTokenExpired(user.token)) {
      return true;
    }

    this.accountService.logout();
    this.router.navigate(['/backoffice/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
