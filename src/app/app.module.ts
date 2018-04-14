import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { authenticationSettings } from '../environments/authentication-settings';
import { AppComponent } from './app.component';

import { AuthenticationModule, AuthenticationGuard } from '@aurochses/angular-auth';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [
      AuthenticationGuard
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent
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
