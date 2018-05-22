import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthenticationModule, AuthenticationService } from '@aurochses/angular-auth';

import { HomeComponent } from './home/home.component';
import { SecureComponent } from './secure/secure.component';

@NgModule({
  declarations: [
    HomeComponent,
    SecureComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthenticationModule
  ],
  providers: [
    AuthenticationService
  ],
})
export class MainModule { }
