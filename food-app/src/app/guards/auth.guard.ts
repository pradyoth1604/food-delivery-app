import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = this.authService.getUserRole();
    const expectedRole = route.data['expectedRole'] as string;

    if (this.authService.isLoggedIn() && (!expectedRole || userRole === expectedRole)) {
      return true;
    }

    // Redirect to login page with returnUrl query parameter
    return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
}
