import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean |
      UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token')) {
      // logged in so return true
      console.log(formatDate(new Date(JSON.parse(localStorage.getItem('token')).exp), 'yyyy-MM-dd', 'en'));

      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/'], { queryParams: { returnUrl: state.url } });
    return true;
  }

}
