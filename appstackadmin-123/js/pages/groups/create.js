function openCreateGroupModal() {
    showModal("#group-create-modal");
    resetCreateGroupForm();
}

function resetCreateGroupForm() {
    initSelect2({
        name: "group-create-validation-creator",
        placeholder: "Select creator..."
    });

    // reset validator
    resetGroupCreateFormValidator();
    initGroupCreateFormValidator({
        submitHandler: function () {
            let name = $("#group-create-validation-name-input").val();
            let member = new Number($("#group-create-validation-member-input").val());
            let creator = $("#group-create-validation-creator-input").val();
            createGroupToServer(name, member, creator);
        }
    });

    // reset input
    $("#group-create-validation-name-input").val("");
    $("#group-create-validation-member-input").val("");
    $("#group-create-validation-creator-input").val("");

    getCreatorsForCreateGroupModal();
}

function getCreatorsForCreateGroupModal() {
    // step 1: get data from api
    groupAPI.creator({
        success: function (data, _, response) {
            // step 2: fill data to select2
            fillCreatorsToCreateGroupModal(data);
        },
    });
}

function fillCreatorsToCreateGroupModal(creators) {
    let rows = "<option value=''>Select creator...</option>";

    for (const creator of creators) {
        let row = `<option value="${creator}">${creator}</option>`;
        rows += row;
    }

    $('#group-create-validation-creator-input').empty();
    $('#group-create-validation-creator-input').append(rows);
}

function createGroupToServer(name, member, creator) {
    // call api
    groupAPI.create({
        name,
        member,
        creator,
        success: function () {
            // show notification
            showSuccessNotification("Create group successfully!");
            // close modal
            hideModal("#group-create-modal");
            // reload view list
            refreshTable();
        }
    })
}