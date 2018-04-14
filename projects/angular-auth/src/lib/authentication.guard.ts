import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { User } from 'oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EnvironmentService } from './services/environment.service';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private environmentService: EnvironmentService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authenticationService.isLoggedIn().pipe(
            map(
                (isLoggedIn: boolean) => {
                    if (isLoggedIn) {
                        if (this.environmentService.IsDevelopment()) {
                            console.debug(`Guard App: User already retrieved. Continuing to ${state.url}.`);
                        }

                        return true;
                    } else {
                        if (this.environmentService.IsDevelopment()) {
                            console.debug(`Guard App: User not logged. Redirecting to /login (and then to ${state.url}).`);
                        }

                        this.authenticationService.signInRedirect(state.url);

                        return false;
                    }
                }
            )
        );
    }
}