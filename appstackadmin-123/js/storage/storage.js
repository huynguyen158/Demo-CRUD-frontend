let storage = {

    saveRememberMe: function (isChecked) {
        localStorage.setItem(LOGIN_CHECKED_REMEMBER_ME, isChecked);
    },

    getRememberMe: function () {
        let isChecked = localStorage.getItem(LOGIN_CHECKED_REMEMBER_ME);
        if (isChecked == null || isChecked == undefined) {
            return true;
        }
        return isChecked === "true";
    },

    setItem(key, value) {
        if (storage.getRememberMe() == true) {
            localStorage.setItem(key, value);
        } else {
            sessionStorage.setItem(key, value);
        }
    },

    getItem(key) {
        if (storage.getRememberMe() == true) {
            return localStorage.getItem(key);
        } else {
            return sessionStorage.getItem(key);
        }
    },

    removeItem(key) {
        if (storage.getRememberMe() == true) {
            localStorage.removeItem(key);
        } else {
            sessionStorage.removeItem(key);
        }
    },

    saveUserInfoToStorage: function (id, username, fullname) {
        storage.setItem(LOGIN_USER_INFO_ID, id);
        storage.setItem(LOGIN_USER_INFO_USERNAME, username);
        storage.setItem(LOGIN_USER_INFO_FULLNAME, fullname);
    },

    getUserInfoToStorage: function () {
        return {
            "id": storage.getItem(LOGIN_USER_INFO_ID),
            "username": storage.getItem(LOGIN_USER_INFO_USERNAME),
            "fullname": storage.getItem(LOGIN_USER_INFO_FULLNAME),
        };
    },

    deleteUserInfoInStorage: function () {
        storage.removeItem(LOGIN_USER_INFO_ID);
        storage.removeItem(LOGIN_USER_INFO_USERNAME);
        storage.removeItem(LOGIN_USER_INFO_FULLNAME);
    },

    isLogin: function () {
        return storage.getItem(LOGIN_USER_INFO_ID) != null && storage.getItem(LOGIN_USER_INFO_ID) != undefined;
    }
}