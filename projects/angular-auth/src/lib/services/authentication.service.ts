import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { UserManager, User } from 'oidc-client';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Environment } from '../models/environment.model';
import { AuthenticationSettings } from '../models/authentication-settings.model';
import { UserModel } from '../models/user.model';


@Injectable()
export class AuthenticationService {
  public userManager: UserManager;

  constructor(
    private router: Router,
    location: Location,
    environment: Environment,
    authenticationSettings: AuthenticationSettings
  ) {
    this.userManager = new UserManager(authenticationSettings);

    this.userManager.events.addAccessTokenExpired(_ => {
      if (environment.production === false) {
        console.log('Token expired!!!');
      }

      this.removeUser();
    });

    this.userManager.events.addAccessTokenExpiring(_ => {
      if (environment.production === false) {
        console.log('Token expiring!!!');
      }
    });

    this.userManager.events.addSilentRenewError((error: Error) => {
      if (environment.production === false) {
        console.error(`Silent renew ${error.stack}`);
      }

      this.removeUser();
    });

    this.userManager.events.addUserLoaded(x => {
      if (environment.production === false) {
        console.log('addUserLoaded');
      }
    });

    this.userManager.events.addUserUnloaded(x => {
      this.signInRedirect(location.path());

      if (environment.production === false) {
        console.log('addUserUnloaded');
      }
    });
  }

  signInRedirect(redirectUrl: string) {
    this.userManager.signinRedirect({ data: { redirectUrl: redirectUrl } });
  }

  signinRedirectCallback() {
    this.userManager.signinRedirectCallback()
      .then((user: User) => {
        this.router.navigateByUrl(user.state.redirectUrl);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  signinSilentCallback() {
    this.userManager.signinSilentCallback();
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUser().pipe(
      map(
        (user: UserModel) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        }
      )
    );
  }

  getUser(): Observable<UserModel> {
    return from(this.userManager.getUser()).pipe(
      map(user => user as UserModel)
    );
  }

  private removeUser() {
    this.userManager.removeUser();
  }

}
