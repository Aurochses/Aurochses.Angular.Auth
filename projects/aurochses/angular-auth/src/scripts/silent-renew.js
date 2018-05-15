var Oidc = window.Oidc;
var UserManager = Oidc.UserManager;
    
if (Oidc && Oidc.Log && Oidc.Log.logger) {
    Oidc.Log.logger = console;
}

new UserManager().signinSilentCallback();
