import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthorizationService {

    constructor(private authenticationService: AuthenticationService) { }

    hasPermission(permissions: Array<string>): Observable<boolean> {
        return this.authenticationService.getUser().pipe(
            map(
                (user: UserModel) => {
                    let flag = true;

                    permissions.forEach(
                        permission => {
                            if (!user.profile.permission || !(user.profile.permission.indexOf(permission) > -1)) {
                                flag = false;
                            }
                        }
                    );

                    return flag;
                }
            )
        );
    }

}
