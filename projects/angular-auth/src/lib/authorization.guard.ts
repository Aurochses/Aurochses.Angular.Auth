import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthenticationSettings } from './models/authentication-settings.model';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(
    private authenticationSettings: AuthenticationSettings,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (next.data && next.data.permissions) {
      if (!this.authenticationService.isUserInRole(next.data.permissions)) {
        window.location.href = this.authenticationSettings.authority + '/forbidden?returnUrl=' + location.origin + state.url;

        return false;
      }

      return true;
    }

    return true;
  }
}
