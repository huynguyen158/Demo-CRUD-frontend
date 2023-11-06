function handleCommonException(jqXHR, textStatus, errorThrown) {
    // error
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
}

/**
 *  Modal
 */

function showModal(id) {
    $(id).modal('show');
}

function hideModal(id) {
    $(id).modal('hide');
}

/**
 * select 2
 */
function initSelect2({ name, placeholder }) {
    $(`select[name=\"${name}\"]`)
        .select2({
            allowClear: true,
            placeholder: placeholder,
        })
}

/**
 * show notification
 */

function showSuccessNotification(message) {
    toastr["success"](message, "", {
        positionClass: "toast-top-right",
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
        rtl: true,
        timeOut: $("#toastr-duration").val()
    });
}

function showErrorNotification(message) {
    toastr["error"](message, "", {
        positionClass: "toast-top-right",
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
        rtl: true,
        timeOut: $("#toastr-duration").val()
    });
}

/**
 * Jquery Validator
 */
jQuery.validator.addMethod("dateGreaterThan",
    function (value, _, params) {
        let paramValue = $(`input[name="${params[1]}"]`).val();

        if (!value || !paramValue) return true;

        return new Date(value) > new Date(paramValue);
    }, `Must be greater than {0}`);

jQuery.validator.addMethod("dateLessThan",
    function (value, _, params) {
        let paramValue = $(`input[name="${params[1]}"]`).val();

        if (!value || !paramValue) return true;

        return new Date(value) < new Date(paramValue);
    }, `Must be less than {0}`);

jQuery.validator.addMethod("numberGreaterThan",
    function (value, _, params) {
        let paramValue = $(`input[name="${params[1]}"]`).val();

        if (!value || !paramValue) return true;

        return Number(value) > Number(paramValue);
    }, `Must be greater than {0}`);

jQuery.validator.addMethod("numberLessThan",
    function (value, _, params) {
        let paramValue = $(`input[name="${params[1]}"]`).val();

        if (!value || !paramValue) return true;

        return Number(value) < Number(paramValue);
    }, `Must be less than {0}`);

function showErrorMessage(idInput, idLabel, errorMessage) {
    $(`#${idInput}`).addClass("is-invalid");
    $(`#${idLabel}`).removeClass("d-none");
    if (errorMessage) {
        $(`#${idLabel}`).text(errorMessage);
    }
}

function hideErrorMessage(idInput, idLabel) {
    $(`#${idInput}`).removeClass("is-invalid");
    $(`#${idLabel}`).addClass("d-none");
}

function initBaseValidator({ formValidator, rules, messages, submitHandler }) {
    $(`${formValidator}`).validate().destroy();
    $(`${formValidator}`).validate({
        rules: rules,
        messages: messages,
        submitHandler: function (form) {
            submitHandler();
            return false;
        },
        // Errors
        errorPlacement: function errorPlacement(error, element) {
            var $parent = $(element).parents(".form-group");
            // Do not duplicate errors
            if ($parent.find(".jquery-validation-error").length) {
                return;
            }
            $parent.append(
                error.addClass(
                    "jquery-validation-error small form-text invalid-feedback"
                )
            );
        },
        highlight: function (element) {
            var $el = $(element);
            var $parent = $el.parents(".form-group");
            $el.addClass("is-invalid");
            // Select2 and Tagsinput
            if (
                $el.hasClass("select2-hidden-accessible") ||
                $el.attr("data-role") === "tagsinput"
            ) {
                $el.parent().addClass("is-invalid");
            }
        },
        unhighlight: function (element) {
            $(element)
                .parents(".form-group")
                .find(".is-invalid")
                .removeClass("is-invalid");
        },
    });
}

function resetValidator(formValidator) {
    if (formValidator) {
        try {
            formValidator.resetForm();
        } catch (e) {
            // ignore
        }
        $("input").removeClass("is-invalid");
    }
}