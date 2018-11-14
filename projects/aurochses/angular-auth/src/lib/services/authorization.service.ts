import { Injectable } from '@angular/core';

import { Environment } from '../models/environment.model';
import { AuthenticationService } from './authentication.service';

import { UserModel } from '../models/user.model';

@Injectable()
export class AuthorizationService {

    constructor(private environment: Environment, private authenticationService: AuthenticationService) { }

    hasPermission(user: UserModel, permissions: Array<string>): boolean {
        let flag = true;

        permissions.forEach(
            permission => {
                if (
                    !user.profile.permission
                    || !(user.profile.permission.indexOf(permission) > -1)
                ) {
                    flag = false;
                }
            }
        );

        return flag;
    }

}
