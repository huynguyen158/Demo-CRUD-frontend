function openHomePage() {
    $("#main").load("../pages/home.html", function () {
        settingCommonForHomePage();
        feather.replace();
    });
}

function settingCommonForHomePage() {
    // TODO
}