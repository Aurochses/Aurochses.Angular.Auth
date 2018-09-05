import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Environment} from '../models/environment.model';
import {AuthenticationSettings} from '../models/authentication-settings.model';
import {AuthorizationService} from '../services/authorization.service';
import { UserManager } from 'oidc-client';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  userManager: UserManager;

  constructor(
    private environment: Environment,
    private authenticationSettings: AuthenticationSettings,
    private authorizationService: AuthorizationService
  ) { this.userManager = new UserManager(authenticationSettings); }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (next.data && next.data.permissions) {
      this.userManager.getUser().then(() => {
        if (this.authorizationService.hasPermission(next.data.permissions)) {
          if (!this.environment.production) {
            console.log(`AuthorizationGuard: User has permission.`);
          }
          return true;
        } else {
          if (!this.environment.production) {
            console.log(`AuthorizationGuard: User has no permission. Redirecting to Forbidden page.`);
          }
          window.location.href = this.authenticationSettings.authority + '/forbidden?returnUrl=' + location.origin + state.url;
          return false;
        }
      });
    }

    return true;
  }

}
