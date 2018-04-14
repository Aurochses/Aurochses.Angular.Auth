import { NgModule, ModuleWithProviders } from '@angular/core';

import { EnvironmentConfig } from './models/environment-config.model';
import { AuthenticationSettings } from './models/authentication-settings.model';
import { EnvironmentService } from './services/environment.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationComponent } from './authentication.component';
import { RenewComponent } from './renew.component';

@NgModule({
  imports: [
  ],
  declarations: [
    AuthenticationComponent,
    RenewComponent
  ],
  exports: [
    AuthenticationComponent,
    RenewComponent
  ],
  providers: [
    EnvironmentService,
    AuthenticationService
  ]
})
export class AuthenticationModule {
  static forRoot(environment: EnvironmentConfig, authenticationSettings: AuthenticationSettings): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        { provide: EnvironmentConfig, useValue: environment },
        { provide: AuthenticationSettings, useValue: authenticationSettings}
      ]
    };
  }
}
