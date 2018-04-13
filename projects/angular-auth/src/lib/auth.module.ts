import { NgModule, ModuleWithProviders } from '@angular/core';

import { EnvironmentConfig } from './models/environment-config.model';
import { AuthComponent } from './auth.component';
import { EnvironmentService } from './services/environment.service';

@NgModule({
  imports: [
  ],
  declarations: [
    AuthComponent
  ],
  exports: [
    AuthComponent
  ],
  providers: [
    EnvironmentService
  ]
})
export class AuthModule {
  static forRoot(environment: EnvironmentConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: EnvironmentConfig, useValue: environment }
      ]
    };
  }
}
