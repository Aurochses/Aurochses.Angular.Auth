import { Component, OnInit } from '@angular/core';

import { AuthenticationService, UserProfileModel } from '@aurochses/angular-auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  userProfile: UserProfileModel;

  constructor(private authenticationService: AuthenticationService) { }

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

  silentSignIn() {
    this.authenticationService.trySilentSignIn();
  }
}
