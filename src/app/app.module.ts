import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AuthenticationModule, AuthenticationService } from '@aurochses/angular-auth';

import { environment } from '../environments/environment';

import { AppRoutesModule } from './app-routes.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AuthenticationModule.forRoot(environment, environment.authenticationSettings),
    AppRoutesModule,
    MainModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
