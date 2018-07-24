var Oidc = window.Oidc;
var UserManager = Oidc.UserManager;

if (Oidc && Oidc.Log && Oidc.Log.logger) {
    Oidc.Log.logger = console;
}

function showError(message) {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("errorMessage").innerText = message;
    document.getElementById("errorUrl").innerText = window.location.origin;
}

new UserManager().signinRedirectCallback()
    .then(
        (user) => {
            if (user == null) {
                showError("No sign-in request pending");
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
            showError(e.message);
        }
    );
