let groupDeleteId;

function openDeleteGroupConfirmModal(id, name) {
    groupDeleteId = id;
    showModal("#group-delete-modal");
    resetDeleteGroupForm(name);
}

function resetDeleteGroupForm(groupName) {
    // reset input
    $("#group-delete-name").text(groupName);
}

function deleteGroupToServer() {
    // call api
    groupAPI.delete({
        id: groupDeleteId,
        success: function () {
            // show notification
            showSuccessNotification("Delete group successfully!");
            // close modal
            hideModal("#group-delete-modal");
            // reload view list
            refreshTable();
        }
    })
}