import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { User } from 'oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Environment } from './models/environment.model';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private environment: Environment,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authenticationService.isLoggedIn().pipe(
            map(
                (isLoggedIn: boolean) => {
                    if (isLoggedIn) {
                        if (this.environment.production === false) {
                            console.log(`Guard App: User already retrieved. Continuing to ${state.url}.`);
                        }

                        return true;
                    } else {
                        if (this.environment.production === false) {
                            console.log(`Guard App: User not logged. Redirecting to /login (and then to ${state.url}).`);
                        }

                        this.authenticationService.signInRedirect(state.url);

                        return false;
                    }
                }
            )
        );
    }
}
