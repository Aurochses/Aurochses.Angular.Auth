import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService, UserProfileModel } from '@aurochses/angular-auth';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  loadedUserSubscription: any;

  userProfile: UserProfileModel;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loadedUserSubscription = this.authenticationService.userLoadededEvent
      .subscribe(
        (user) => {
          if (user) {
            this.userProfile = user.profile;
          }
        }
      );

    this.authenticationService.getUser();
  }

  ngOnDestroy() {
    if (this.loadedUserSubscription.unsubscribe()) {
      this.loadedUserSubscription.unsubscribe();
    }
  }

}
