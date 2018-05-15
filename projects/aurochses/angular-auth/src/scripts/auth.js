var Oidc = window.Oidc;
var UserManager = Oidc.UserManager;

if (Oidc && Oidc.Log && Oidc.Log.logger) {
    Oidc.Log.logger = console;
}

new UserManager().signinRedirectCallback()
    .then(
        (user) => {
            if (user == null) {
                document.getElementById("waiting").style.display = "none";
                document.getElementById("error").innerText = "No sign-in request pending.";
            }
            else {
                if (user.state && user.state.returnUrl) {
                    window.location = user.state.returnUrl;
                } else {
                    window.location = '/';
                }
            }
        }
    )
    .catch(
        (e) => {
            document.getElementById("waiting").style.display = "none";
            document.getElementById("error").innerText = er.message;
        }
    );
