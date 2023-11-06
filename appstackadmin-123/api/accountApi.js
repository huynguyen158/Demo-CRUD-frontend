const ACCOUNT_API_URL = `${BASE_API_URL}/accounts`

let accountAPI = {

    getAll: function ({ page, success }) {
        $.ajax({
            url: `${BASE_API_URL}?_page=${page}&_limit=${PAGING_SIZE}`,
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            success: success,
            error(jqXHR, textStatus, errorThrown) {
                handleCommonException(jqXHR, textStatus, errorThrown);
            }
        });
    },

    create: function (name, creator) {
        // call api
    },

    update: function (id, name, creator) {
        // call api
    },

    delete: function (id) {
        // call api
    }
};