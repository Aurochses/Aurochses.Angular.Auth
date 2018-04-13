import { Component } from '@angular/core';

import { EnvironmentService } from './services/environment.service';

@Component({
  selector: 'aur-auth',
  template: `
    <p>
      angular-auth works!
    </p>
  `,
  styles: []
})
export class AuthComponent {

  constructor(environmentService: EnvironmentService) { }

}
