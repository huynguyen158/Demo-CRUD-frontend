$(function () {
    resetLoginForm();
});

function resetLoginForm() {
    // reset validator
    resetLoginFormValidator();
    initLoginFormValidator({
        submitHandler: function () {
            let username = $("#login-validation-username-input").val();
            let password = $("#login-validation-password-input").val();
            loginToServer(username, password);
        }
    });

    // reset input
    $("#login-validation-username-input").val("");
    $("#login-validation-password-input").val("");

    // reset remember me
    $("#login-remember-me-input").prop('checked', storage.getRememberMe());
}

function loginToServer(username, password) {
    // call api
    authAPI.login({
        username,
        password,
        success: function (data) {
            if (data.length == 0) {
                showErrorNotification("Username/password wrong!")
            } else {

                // save remember me
                let isCheckedMemberMe = $("#login-remember-me-input").is(":checked");
                storage.saveRememberMe(isCheckedMemberMe);

                // save user info to storage
                let user = data[0];
                storage.saveUserInfoToStorage(user.id, user.username, user.fullname);

                // // redirect to Home page
                window.location.href = "/html/common/index.html";
            }
        }
    })
}