import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './services/authentication.service';

@Component({
  template: ''
})
export class RenewComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.signinSilentCallback();
  }

}
