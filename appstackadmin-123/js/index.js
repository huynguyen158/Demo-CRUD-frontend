$(function () {

    // check login
    if (!storage.isLogin()) {
        // redirect to Login page
        window.location.href = "/html/auth/login.html";
        return;
    }

    loadComponents();
    openPage("Home");
});

function loadComponents() {
    let user = storage.getUserInfoToStorage();

    // load html
    $("#sidebar").load("sidebar.html", function () {
        $("#sidebar-user-fullname").text(user.fullname);
        feather.replace();
    });
    $("#header").load("header.html", function () {
        $("#header-user-fullname").text(user.fullname);
        feather.replace();
    });
    $("#footer").load("footer.html", function () {
        feather.replace();
    });
}

function openPage(pageName) {
    switch (pageName) {
        case 'Home':
            openHomePage();
            break;
        case 'Groups':
            openGroupPage();
            break;
        case 'Accounts':
            openAccountPage();
            break;
    }
}

function logout() {
    // delete user info in storage
    storage.deleteUserInfoInStorage();
    // redirect to Login page
    window.location.href = "/html/auth/login.html";
}