const GROUP_API_URL = `${BASE_API_URL}/groups`;
const GROUP_CREATOR_API_URL = `${BASE_API_URL}/creators`;

let groupAPI = {

    getAll: function ({ page, search, minDate, maxDate, minMember, maxMember, sortField, isAsc, success }) {

        let url = `${GROUP_API_URL}?_page=${page}&_limit=${PAGING_SIZE}`;

        // search
        if (search) {
            url += `&q=${search}`;
        }

        // filter
        if (minDate) {
            url += `&createdDate_gte=${minDate}`;
        }

        if (maxDate) {
            url += `&createdDate_lte=${maxDate}`;
        }

        if (minMember) {
            url += `&member_gte=${minMember}`;
        }

        if (maxMember) {
            url += `&member_lte=${maxMember}`;
        }

        // sort
        url += `&_sort=${sortField}&_order=${isAsc ? "asc" : "desc"}`;

        $.ajax({
            url: url,
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            success: success,
            error(jqXHR, textStatus, errorThrown) {
                handleCommonException(jqXHR, textStatus, errorThrown);
            }
        });
    },

    creator: function ({ success }) {
        $.ajax({
            url: GROUP_CREATOR_API_URL,
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            success: success,
            error(jqXHR, textStatus, errorThrown) {
                handleCommonException(jqXHR, textStatus, errorThrown);
            }
        });
    },

    checkNameExists: function ({ name, success }) {

        $.ajax({
            url: `${GROUP_API_URL}?name=${name}`,
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            success: success,
            error(jqXHR, textStatus, errorThrown) {
                handleCommonException(jqXHR, textStatus, errorThrown);
            }
        });
    },

    create: function ({ name, member, creator, success }) {
        let newGroup = {
            "name": name,
            "member": member,
            "creator": creator,
            "createdDate": moment().format("YYYY-MM-DD")
        };

        $.ajax({
            url: GROUP_API_URL,
            type: 'POST',
            data: JSON.stringify(newGroup), // body
            contentType: "application/json",
            success: success,
            error(jqXHR, textStatus, errorThrown) {
                handleCommonException(jqXHR, textStatus, errorThrown);
            }
        });
    },

    getDetail: function ({ groupId, success }) {
        $.ajax({
            url: `${GROUP_API_URL}/${groupId}`,
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            success: success,
            error(jqXHR, textStatus, errorThrown) {
                handleCommonException(jqXHR, textStatus, errorThrown);
            }
        });
    },

    update: function ({ id, name, member, creator, createdDate, success }) {
        let newGroupInfo = {
            "name": name,
            "member": member,
            "creator": creator,
            "createdDate": createdDate
        };
        console.log(newGroupInfo);
        $.ajax({
            url: `${GROUP_API_URL}/${id}`,
            type: 'PUT',
            data: JSON.stringify(newGroupInfo), // body
            contentType: "application/json",
            success: success,
            error(jqXHR, textStatus, errorThrown) {
                handleCommonException(jqXHR, textStatus, errorThrown);
            }
        });
    },

    delete: function ({ id, success }) {
        $.ajax({
            url: `${GROUP_API_URL}/${id}`,
            type: 'DELETE',
            contentType: "application/json",
            dataType: 'json',
            success: success,
            error(jqXHR, textStatus, errorThrown) {
                handleCommonException(jqXHR, textStatus, errorThrown);
            }
        });
    },

    deleteAll: function ({ ids, success }) {
        for (const id of ids) {
            groupAPI.delete({ id, success: null });
        }
        success();
    },
};