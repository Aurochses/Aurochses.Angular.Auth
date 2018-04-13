import { Component } from '@angular/core';

import { EnvironmentService } from './services/environment.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'aur-auth',
  template: `
    <p>
      angular-auth works!
    </p>
  `,
  styles: []
})
export class AuthenticationComponent {

  constructor(environmentService: EnvironmentService, authenticationService: AuthenticationService) { }

}
