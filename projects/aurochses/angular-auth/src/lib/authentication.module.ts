import { NgModule, ModuleWithProviders } from '@angular/core';

import { Environment } from './models/environment.model';
import { AuthenticationSettings } from './models/authentication-settings.model';
import { AuthenticationService } from './services/authentication.service';
import { AuthorizationService } from './services/authorization.service';

@NgModule({
  providers: [
    AuthenticationService,
    AuthorizationService
  ]
})
export class AuthenticationModule {
  static forRoot(environment: Environment, authenticationSettings: AuthenticationSettings): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        { provide: Environment, useValue: environment },
        { provide: AuthenticationSettings, useValue: authenticationSettings}
      ]
    };
  }
}
