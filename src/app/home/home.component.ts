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
          console.log('event');

          if (user) {
            console.log('event 2');

            this.userProfile = user.profile;
          }
        }
      );
  }

  ngOnDestroy() {
    if (this.loadedUserSubscription.unsubscribe()) {
      this.loadedUserSubscription.unsubscribe();
    }
  }

}
