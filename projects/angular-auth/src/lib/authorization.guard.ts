import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthenticationSettings } from './models/authentication-settings.model';
import { AuthorizationService } from './services/authorization.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(
    private authenticationSettings: AuthenticationSettings,
    private authorizationService: AuthorizationService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (next.data && next.data.permissions) {
      if (!this.authorizationService.hasPermission(next.data.permissions)) {
        window.location.href = this.authenticationSettings.authority + '/forbidden?returnUrl=' + location.origin + state.url;

        return false;
      }

      return true;
    }

    return true;
  }
}