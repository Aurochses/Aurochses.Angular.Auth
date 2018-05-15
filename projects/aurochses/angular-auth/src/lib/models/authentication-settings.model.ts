import { UserManagerSettings } from 'oidc-client';

export class AuthenticationSettings implements UserManagerSettings {
    authority: string;
    client_id: string;
    redirect_uri: string;
    post_logout_redirect_uri: string;
    response_type: string;
    scope: string;
    silent_redirect_uri: any;
    automaticSilentRenew: any;
    accessTokenExpiringNotificationTime: number;
    filterProtocolClaims: boolean;
    loadUserInfo: boolean;
}
