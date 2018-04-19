import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      return this.authorizationService.hasPermission(next.data.permissions).pipe(
        map(
          (hasPermission: boolean) => {
            if (hasPermission === true) {
              return true;
            } else {
              window.location.href = this.authenticationSettings.authority + '/forbidden?returnUrl=' + location.origin + state.url;

              return false;
            }
          }
        )
      );
    }

    return true;
  }
}
