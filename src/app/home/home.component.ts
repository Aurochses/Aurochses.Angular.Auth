import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '@aurochses/angular-auth';
import { UserProfileModel } from '@aurochses/angular-auth';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  userProfile: UserProfileModel;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getUser().subscribe(user => this.userProfile = user.profile);
  }

}
