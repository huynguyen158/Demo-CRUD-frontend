let checkedGroupIndexes;

function onChangeGroupDeleteAllCheckboxHeader() {
    let isCheck = $("#group-delete-all-header").is(':checked');

    for (let index = 0; index < PAGING_SIZE; index++) {
        $(`#group-delete-all-item-${index}`).prop('checked', isCheck);
    }
}

function onChangeGroupDeleteAllCheckboxItem() {
    let isCheckHeader = countCheckedGroupDeleteAllItem() == PAGING_SIZE;
    $(`#group-delete-all-header`).prop('checked', isCheckHeader);
}

function countCheckedGroupDeleteAllItem() {
    let checkdItemCount = 0;
    for (let index = 0; index < PAGING_SIZE; index++) {
        if ($(`#group-delete-all-item-${index}`).is(':checked') == true) {
            checkdItemCount++;
        };
    }
    return checkdItemCount;
}

function openDeleteAllGroupConfirmModal() {

    if (countCheckedGroupDeleteAllItem() == 0) {
        showErrorNotification("You must tick at least a group!");
        return;
    }

    // show confirm
    showModal("#group-delete-all-modal");
    resetDeleteAllGroupForm();
}

function resetDeleteAllGroupForm() {
    checkedGroupIndexes = [];
    // get list of checked index
    for (let index = 0; index < PAGING_SIZE; index++) {
        if ($(`#group-delete-all-item-${index}`).is(':checked') == true) {
            checkedGroupIndexes.push(index);
        };
    }

    // get name based on indexes
    let checkedGroupNames = [];
    for (const groupCheckedIndex of checkedGroupIndexes) {
        checkedGroupNames.push(groupData[groupCheckedIndex].name);
    }

    // reset input
    $("#group-delete-all-name").text(checkedGroupNames.join(", ") + (checkedGroupIndexes.length == 1 ? " group" : " groups") + "?");
}

function deleteAllGroupToServer() {

    // get id based on indexes
    let checkedGroupIds = [];
    for (const groupCheckedIndex of checkedGroupIndexes) {
        checkedGroupIds.push(groupData[groupCheckedIndex].id);
    }

    // call api
    groupAPI.deleteAll({
        ids: checkedGroupIds,
        success: function () {
            // show notification
            showSuccessNotification("Delete groups successfully!");
            // close modal
            hideModal("#group-delete-all-modal");
            // reload view list
            refreshTable();
        }
    });
}