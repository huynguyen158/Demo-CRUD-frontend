function openAccountPage() {
    $("#main").load("../pages/pages-accounts.html", function () {
        settingCommonForAccountPage();
        feather.replace();
    });
}

function settingCommonForAccountPage() {
    // TODO
}