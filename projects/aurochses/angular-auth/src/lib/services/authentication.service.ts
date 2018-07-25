import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { UserManager } from 'oidc-client';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Environment } from '../models/environment.model';
import { AuthenticationSettings } from '../models/authentication-settings.model';
import { UserModel } from '../models/user.model';


@Injectable()
export class AuthenticationService {
  userManager: UserManager;
  userLoadededEvent: EventEmitter<UserModel> = new EventEmitter<UserModel>();
  currentUser: UserModel;
  isLoggedIn = false;

  constructor(
    private router: Router,
    private environment: Environment,
    authenticationSettings: AuthenticationSettings
  ) {
    this.userManager = new UserManager(authenticationSettings);

    this.userManager.getUser()
      .then(
        (user) => {
          if (user) {
            if (!this.environment.production) {
              console.log('AuthenticationService: constructor: User found.');
            }

            this.isLoggedIn = true;
            this.currentUser = user;
            this.userLoadededEvent.emit(user);
          } else {
            if (!this.environment.production) {
              console.log('AuthenticationService: constructor: User not found.');
            }

            this.isLoggedIn = false;
          }
        }
      ).catch(
        (e) => {
          this.isLoggedIn = false;

          console.log(e);
        }
      );

    this.userManager.events.addUserLoaded(
      (user: UserModel) => {
        this.currentUser = user;
        this.isLoggedIn = !!user;
        this.userLoadededEvent.emit(user);

        if (!environment.production) {
          console.log('AuthenticationService: User Loaded.');
        }
      }
    );

    this.userManager.events.addUserUnloaded(
      () => {
        if (!environment.production) {
          console.log('AuthenticationService: User Unloaded.');
        }

        this.userLoadededEvent.emit(null);
        this.isLoggedIn = false;
      }
    );

    this.userManager.events.addAccessTokenExpiring(
      () => {
        if (!environment.production) {
          console.log('AuthenticationService: Access Token Expiring.');
        }
      }
    );

    this.userManager.events.addAccessTokenExpired(
      () => {
        if (!environment.production) {
          console.log('AuthenticationService: Access Token Expired.');
        }

        this.removeUser();
      }
    );

    this.userManager.events.addSilentRenewError(
      (error: Error) => {
        if (!environment.production) {
          console.error(`AuthenticationService: Silent Renew Error: ${error.stack}.`);
        }

        this.removeUser();
      }
    );

    this.userManager.events.addUserSignedOut(
      () => {
        if (!environment.production) {
          console.log('AuthenticationService: User Signed Out.');
        }

        this.removeUser();
      }
    );
  }

  isLoggedInObservable(): Observable<boolean> {
    return from(this.userManager.getUser())
      .pipe(
        map(
          (user) => {
            if (user) {
              return true;
            } else {
              return false;
            }
          }
        )
      );
  }

  loadUser() {
    this.userManager.getUser()
      .then(
        (user) => {
          if (!this.environment.production) {
            console.log('AuthenticationService: loadUser.');
          }

          this.currentUser = user;
          this.userLoadededEvent.emit(user);
        }
      ).catch(
        (e) => {
          console.log(e);
        }
      );
  }

  removeUser() {
    this.userManager.removeUser()
      .then(
        () => {
          if (!this.environment.production) {
            console.log('AuthenticationService: Remove User.');
          }
        }
      ).catch(
        (e) => {
          console.log(e);
        }
      );
  }

  signInRedirect(returnUrl: string) {
    this.userManager.signinRedirect({ data: { returnUrl: returnUrl } })
      .then(
        () => {
          if (!this.environment.production) {
            console.log('AuthenticationService: Sign In Redirect done.');
          }
        }
      ).catch(
        (e) => {
          console.log(e);
        }
      );
  }

  signInRedirectCallback() {
    this.userManager.signinRedirectCallback()
      .then(
        (user: UserModel) => {
          if (!this.environment.production) {
            console.log('AuthenticationService: Sign In Redirect Callback done.');
          }

          this.router.navigateByUrl(user.state.returnUrl);
        }
      ).catch(
        (e) => {
          console.log(e);
        }
      );
  }

  signInSilent() {
    this.userManager.signinSilent()
      .then(
        () => {
          if (!this.environment.production) {
            console.log('AuthenticationService: Sign In Silent done.');
          }
        }
      ).catch(
        (e) => {
          console.log(e);
        }
      );
  }

  signInSilentCallback() {
    this.userManager.signinSilentCallback()
      .then(
        () => {
          if (!this.environment.production) {
            console.log('AuthenticationService: Sign In Silent Callback done.');
          }
        }
      ).catch(
        (e) => {
          console.log(e);
        }
      );
  }

  signOutRedirect() {
    this.userManager.signoutRedirect()
      .then(
        () => {
          if (!this.environment.production) {
            console.log('AuthenticationService: Sign Out Redirect done.');
          }
        }
      ).catch(
        (e) => {
          console.log(e);
        }
      );
  }

  signOutRedirectCallback() {
    this.userManager.signoutRedirectCallback()
      .then(
        () => {
          if (!this.environment.production) {
            console.log('AuthenticationService: Sign Out Redirect Callback done.');
          }
        }
      ).catch(
        (e) => {
          console.log(e);
        }
      );
  }

  trySilentSignIn(): Promise<boolean> {
    return this.userManager.signinSilent()
      .then(
        () => {
          if (!this.environment.production) {
            console.log('AuthenticationService: Try Sign In Silent success.');
          }

          return true;
        }
      ).catch(
        () => {
          if (!this.environment.production) {
            console.log('AuthenticationService: Try Sign In Silent failed.');
          }

          return false;
        }
      );
  }

}
