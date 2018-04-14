import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { authenticationSettings } from '../environments/authentication-settings';

import { AuthenticationModule, AuthenticationGuard, AuthenticationComponent } from '@aurochses/angular-auth';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [
      AuthenticationGuard
    ]
  },
  {
    path: 'auth',
    component: AuthenticationComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthenticationModule.forRoot(environment, authenticationSettings)
  ],
  providers: [
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
