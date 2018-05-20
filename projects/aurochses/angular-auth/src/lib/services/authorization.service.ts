import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Environment } from '../models/environment.model';
import { AuthenticationService } from './authentication.service';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthorizationService {

    constructor(private environment: Environment, private authenticationService: AuthenticationService) { }

    hasPermission(permissions: Array<string>): boolean {
        if (this.authenticationService.currentUser) {
            let flag = true;

            permissions.forEach(
                permission => {
                    if (
                        !this.authenticationService.currentUser.profile.permission
                        || !(this.authenticationService.currentUser.profile.permission.indexOf(permission) > -1)
                    ) {
                        flag = false;
                    }
                }
            );

            return flag;
        }

        return false;
    }

}