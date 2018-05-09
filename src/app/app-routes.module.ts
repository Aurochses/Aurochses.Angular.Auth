import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard, AuthorizationGuard } from '@aurochses/angular-auth';

import { HomeComponent } from './main/home/home.component';
import { SecureComponent } from './main/secure/secure.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'secure',
        component: SecureComponent,
        canActivate: [
            AuthenticationGuard,
            AuthorizationGuard
        ],
        data: {
            permissions: ['fakePermission']
        }
    },
    {
        path: '**',
        pathMatch: 'prefix',
        redirectTo: ''
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    providers: [
        AuthenticationGuard,
        AuthorizationGuard
    ]
})
export class AppRoutesModule { }
