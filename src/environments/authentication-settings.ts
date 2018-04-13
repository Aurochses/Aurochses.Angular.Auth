import { AuthenticationSettings } from '@aurochses/angular-auth';

export const authenticationSettings: AuthenticationSettings = {
  authority: 'http://identityserver.test.csharp.aurochses.demo.by',
  client_id: 'angular2client',
  redirect_uri: 'http://localhost:4100/auth',
  post_logout_redirect_uri: 'http://localhost:4100',
  response_type: 'id_token token',
  scope: 'openid profile email api permissions',
  silent_redirect_uri: 'http://localhost:4100/renew',
  automaticSilentRenew: true,
  accessTokenExpiringNotificationTime: 240,
  filterProtocolClaims: true,
  loadUserInfo: true
};