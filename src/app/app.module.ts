import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';

import {
  AuthenticationModule,
  AuthenticationService,
  AuthenticationGuard,
  AuthorizationGuard
} from '@aurochses/angular-auth';

import { AppRoutesModule } from './app-routes.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { OtherComponent } from './other/other.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OtherComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutesModule,
    AuthenticationModule.forRoot(environment, environment.authenticationSettings)
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    AuthorizationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
