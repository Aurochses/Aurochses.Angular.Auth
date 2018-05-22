import { AuthenticationSettings } from '@aurochses/angular-auth';

export const authenticationSettings: AuthenticationSettings = {
  authority: 'http://identityserver.test.csharp.aurochses.demo.by',
  client_id: 'Aurochses.Angular.Auth',
  redirect_uri: 'http://auth.test.angular.aurochses.demo.by/auth.html',
  post_logout_redirect_uri: 'http://auth.test.angular.aurochses.demo.by',
  response_type: 'id_token token',
  scope: 'openid profile email api permissions',
  silent_redirect_uri: 'http://auth.test.angular.aurochses.demo.by/silent-renew.html',
  automaticSilentRenew: true,
  accessTokenExpiringNotificationTime: 240,
  filterProtocolClaims: true,
  loadUserInfo: true
};
