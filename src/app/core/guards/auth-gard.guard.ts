import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGardGuard implements CanActivate {

  constructor(
    private router: Router, 
    private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const { authenticationRequired, authenticationFailureRedirect } = route.data;
      
      if( typeof authenticationRequired === 'boolean' && authenticationRequired === this.userService.isLogged) {
          return true;
      }

    let authRedirectUrl = authenticationFailureRedirect;
    if(authenticationRequired) {
        const loginRedirectUrl = route.url.reduce((acc, s) => `${acc}/${s.path}`,'');
       authRedirectUrl += `?redirectUrl=${loginRedirectUrl}`;
    }
 
    return this.router.parseUrl(authRedirectUrl || '/');
  }
  
}

