const LOGIN_API_URL = `${BASE_API_URL}/accounts`;

let authAPI = {

    login: function ({ username, password, success }) {

        $.ajax({
            url: `${LOGIN_API_URL}?username=${username}&password=${password}`,
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            success: success,
            error(jqXHR, textStatus, errorThrown) {
                handleCommonException(jqXHR, textStatus, errorThrown);
            }
        });
    }
};