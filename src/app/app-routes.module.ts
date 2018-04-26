import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    AuthenticationGuard,
    AuthorizationGuard
} from '@aurochses/angular-auth';

import { HomeComponent } from './home/home.component';
import { OtherComponent } from './other/other.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [
            AuthenticationGuard,
            AuthorizationGuard
        ],
        data: {

        }
    },
    {
        path: 'other',
        component: OtherComponent,
        canActivate: [
            AuthenticationGuard,
            AuthorizationGuard
        ],
        data: {
            //permissions: ['fakePermission']
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
    ]
})
export class AppRoutesModule { }
