let loginFormValidator;

/**
 * Login
 */
function initLoginFormValidator({ submitHandler }) {
    initBaseValidator({
        formValidator: "#login-form",
        rules: {
            "login-validation-username": {
                required: true,
            },
            "login-validation-password": {
                required: true,
            }
        },
        submitHandler,
    });
    loginFormValidator = $("#login-form");
}

function resetLoginFormValidator() {
    resetValidator(loginFormValidator);
}