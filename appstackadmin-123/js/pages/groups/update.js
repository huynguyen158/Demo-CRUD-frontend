let groupUpdateId;
let groupOldName;

function openUpdateGroupModal(id) {
    groupUpdateId = id;
    showModal("#group-update-modal");
    resetUpdateGroupForm();
}

function resetUpdateGroupForm() {
    initSelect2({
        name: "group-update-validation-creator",
        placeholder: "Select creator..."
    });

    // reset validator
    resetGroupUpdateFormValidator();
    initGroupUpdateFormValidator({
        submitHandler: function () {
            let name = $("#group-update-validation-name-input").val();
            let member = new Number($("#group-update-validation-member-input").val());
            let creator = $("#group-update-validation-creator-input").val();
            let createdDate = $("#group-update-validation-created-date-input").val();
            updateGroupToServer(name, member, creator, createdDate);
        }
    });

    // reset input
    $("#group-update-validation-name-input").val("");
    $("#group-update-validation-member-input").val("");
    $("#group-update-validation-creator-input").val("");
    $("#group-update-validation-created-date-input").val("");

    getCreatorsForUpdateGroupModal();
}

function getCreatorsForUpdateGroupModal() {
    // step 1: get data from api
    groupAPI.creator({
        success: function (data, _, response) {
            // step 2: fill data to select2
            fillCreatorsToUpdateGroupModal(data);
        },
    });
}

function fillCreatorsToUpdateGroupModal(creators) {
    let rows = "<option value=''>Select creator...</option>";

    for (const creator of creators) {
        let row = `<option value="${creator}">${creator}</option>`;
        rows += row;
    }

    $('#group-update-validation-creator-input').empty();
    $('#group-update-validation-creator-input').append(rows);
    getGroupDetailForUpdateGroupModal();
}

function getGroupDetailForUpdateGroupModal() {
    // step 1: get data from api
    groupAPI.getDetail({
        groupId: groupUpdateId,
        success: function (data, _, _) {
            // step 2: fill data to select2
            fillGroupDetailToUpdateGroupModal(data);
        },
    });
}

function fillGroupDetailToUpdateGroupModal(group) {
    $("#group-update-validation-name-input").val(group.name);
    $("#group-update-validation-member-input").val(group.member);
    $("#group-update-validation-creator-input").val(group.creator).change();
    $("#group-update-validation-created-date-input").val(group.createdDate);

    groupOldName = group.name;
}

function updateGroupToServer(name, member, creator, createdDate) {
    // call api
    groupAPI.update({
        id: groupUpdateId,
        name,
        member,
        creator,
        createdDate,
        success: function () {
            // show notification
            showSuccessNotification("Update group successfully!");
            // close modal
            hideModal("#group-update-modal");
            // reload view list
            refreshTable();
        }
    })
}