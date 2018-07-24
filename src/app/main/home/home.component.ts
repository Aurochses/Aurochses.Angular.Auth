import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, UserProfileModel } from '@aurochses/angular-auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  userProfile: UserProfileModel;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.userLoadededEvent
      .subscribe(
        (user) => {
          if (user) {
            this.userProfile = user.profile;
          }
        }
      );
  }

  signIn() {
    this.authenticationService.signInRedirect(this.router.url);
  }

  silentSignIn() {
    this.authenticationService.trySilentSignIn();
  }
}
