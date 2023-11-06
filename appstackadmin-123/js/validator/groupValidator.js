let groupFilterFormValidator;
let groupCreateFormValidator;
let groupUpdateFormValidator;

/**
 * Filter
 */
function initGroupFilterFormValidator({ submitHandler }) {
    initBaseValidator({
        formValidator: "#group-filter-form",
        rules: {
            "group-filter-validation-min-date": {
                date: true,
            },
            "group-filter-validation-max-date": {
                date: true,
                dateGreaterThan: ['the min date', 'group-filter-validation-min-date']
            },
            "group-filter-validation-min-member": {
                min: 0
            },
            "group-filter-validation-max-member": {
                min: 0,
                numberGreaterThan: ['the min member', 'group-filter-validation-min-member']
            },
        },
        messages: {
            "group-filter-validation-min-member": {
                min: "The min member is greater or equal 0",
            },
            "group-filter-validation-max-member": {
                min: "The max member is greater or equal 0",
            }
        },
        submitHandler,
    });
    groupFilterFormValidator = $("#group-filter-form");

    // validate when changing value of fields
    $("#group-filter-min-date").on("change.datetimepicker", ({ date, oldDate }) => {
        $(`input[name="group-filter-validation-max-date"]`).valid();
    });

    $(`input[name="group-filter-validation-min-member"]`).on("change", function () {
        $(`input[name="group-filter-validation-max-member"]`).valid();
    });
}

function resetGroupFilterFormValidator() {
    resetValidator(groupFilterFormValidator);
}

/**
 * Create
 */
function initGroupCreateFormValidator({ submitHandler }) {
    initBaseValidator({
        formValidator: "#group-create-form",
        rules: {
            "group-create-validation-name": {
                required: true,
                rangelength: [6, 20],
                remote: {
                    url: `${GROUP_API_URL}`,
                    type: "GET",
                    data: {
                        name: function () {
                            return $("#group-create-validation-name-input").val();
                        }
                    },
                    dataFilter: function (data) {
                        let groups = JSON.parse(data);
                        if (groups.length > 0) {
                            return false;
                        }
                        return true;
                    }
                }
            },
            "group-create-validation-member": {
                required: true,
                min: 0
            },
            "group-create-validation-creator": {
                required: true,
            },
        },
        messages: {
            "group-create-validation-name": {
                remote: "The group name already exists!",
            }
        },
        submitHandler
    });
    groupCreateFormValidator = $("#group-create-form");
}

function resetGroupCreateFormValidator() {
    resetValidator(groupCreateFormValidator);
}

/**
 * Update
 */
function initGroupUpdateFormValidator({ submitHandler }) {
    initBaseValidator({
        formValidator: "#group-update-form",
        rules: {
            "group-update-validation-name": {
                required: true,
                rangelength: [6, 20],
                remote: {
                    url: `${GROUP_API_URL}`,
                    type: "GET",
                    data: {
                        name: function () {
                            return $("#group-update-validation-name-input").val();
                        }
                    },
                    dataFilter: function (data) {
                        if ($("#group-update-validation-name-input").val() == groupOldName) {
                            return true;
                        }
                        let groups = JSON.parse(data);
                        if (groups.length > 0) {
                            return false;
                        }
                        return true;
                    }
                }
            },
            "group-update-validation-member": {
                required: true,
                min: 0
            },
            "group-update-validation-creator": {
                required: true,
            },
            "group-update-validation-created-date": {
                required: true,
            },
        },
        messages: {
            "group-update-validation-name": {
                remote: "The group name already exists!",
            }
        },
        submitHandler
    });
    groupUpdateFormValidator = $("#group-update-form");
}

function resetGroupUpdateFormValidator() {
    resetValidator(groupUpdateFormValidator);
}