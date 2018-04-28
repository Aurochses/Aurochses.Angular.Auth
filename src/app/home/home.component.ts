import { Component, OnInit } from '@angular/core';

import { AuthenticationService, UserProfileModel } from '@aurochses/angular-auth';

@Component({
  selector: 'home',
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

    this.authenticationService.trySilentSignIn();
    // this.authenticationService.getUser();
  }

}
