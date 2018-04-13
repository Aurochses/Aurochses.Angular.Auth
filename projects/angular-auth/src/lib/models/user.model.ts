import { User } from 'oidc-client';
import { UserProfileModel } from './user-profile.model';

export class UserModel implements User {
    id_token: string;
    session_state: any;
    access_token: string;
    token_type: string;
    scope: string;
    profile: UserProfileModel;
    expires_at: number;
    state: any;
    expires_in: number;
    expired: boolean;
    scopes: string[];

    toStorageString(): string {
        throw new Error('Method not implemented.');
    }
}
