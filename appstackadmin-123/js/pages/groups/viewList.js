let groupCurrentPage;
let groupCurrentSearch;

let groupFilterMinDate;
let groupFilterMaxDate;
let groupFilterMinMember;
let groupFilterMaxMember;

let groupCurrentSortField;
let isGroupSortAsc;

let groupData;

function openGroupPage() {
    $("#main").load("../pages/pages-groups.html", function () {
        settingCommonForGroupPage();
        initGroupPageValue();
        feather.replace();
        getDataForGroupTable();
    });
}

function settingCommonForGroupPage() {
    $('#group-filter-min-date').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#group-filter-max-date').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    setupTriggerForGroupSearchInput();
}

function initGroupPageValue() {
    groupCurrentPage = 1;
    resetGroupSearch();

    // filter
    resetGroupFilterForm();
    initGroupFilterFormValidator({
        submitHandler: function () {
            onClickGroupFilter();
        }
    });

    // sort
    resetGroupSort();
}

/**
 * GET ALL
 */
function getDataForGroupTable() {

    // step 1: get data from api
    groupAPI.getAll({
        page: groupCurrentPage,
        search: groupCurrentSearch,
        minDate: groupFilterMinDate,
        maxDate: groupFilterMaxDate,
        minMember: groupFilterMinMember,
        maxMember: groupFilterMaxMember,
        sortField: groupCurrentSortField,
        isAsc: isGroupSortAsc,
        success: function (data, _, response) {
            // success
            let totalItems = response.getResponseHeader('x-total-count');

            // step 2: fill data to table
            fillGroupDataToTable(data);
            fillGroupPagingToTable(totalItems);
        },
    });
}

function fillGroupDataToTable(groups) {
    groupData = groups;

    let rows = "";

    for (const i in groups) {
        let group = groups[i];
        let row = `<tr>
                        <td class="d-none d-sm-table-cell text-center">
							<input id="group-delete-all-item-${i}" type="checkbox" value="" 
                                onchange="onChangeGroupDeleteAllCheckboxItem()" />
						</td>
                        <td>${group.name}</td>
                        <td>${group.member}</td>
                        <td>${group.creator}</td>
                        <td>${group.createdDate}</td>
                        <td class="text-center">
                            <span onclick="openUpdateGroupModal(${group.id})">
                                <i data-feather="edit"></i>
                            </span>
                            <span class="ml-2" onclick="openDeleteGroupConfirmModal(${group.id}, '${group.name}')">
                                <i data-feather="trash"></i>
                            </span>
                        </td>
                   </tr>`;
        rows += row;
    }
    $('#group-body').empty();
    $('#group-body').append(rows);
    feather.replace();
}

/**
 * PAGING
 */

function fillGroupPagingToTable(totalItems) {
    let rows = "";
    const totalPages = Math.ceil(totalItems / PAGING_SIZE);

    // previous
    rows += `
        <li onclick="onClickPreviousPage()" class="page-item ${groupCurrentPage === 1 ? "disabled" : ""} ">
            <a class="page-link" href="#">Previous</a>
        </li>`;

    // pages
    for (let index = 1; index <= totalPages; index++) {
        let row = `
            <li onclick="onClickChangePage(${index})" class="page-item ${groupCurrentPage === index ? "active" : ""}">
                <a class="page-link" href="#">${index}</a>
            </li>`;
        rows += row;
    }
    // next
    rows += `
    <li onclick="onClickNextPage(${totalPages})" class="page-item ${groupCurrentPage === totalPages ? "disabled" : ""} ">
        <a class="page-link" href="#">Next</a>
    </li>`;

    // binding UI
    $('#group-pagination').empty();
    $('#group-pagination').append(rows);
}

function onClickChangePage(page) {
    if (page === groupCurrentPage) return;

    // change page
    groupCurrentPage = page;
    getDataForGroupTable();
}

function onClickPreviousPage() {
    if (groupCurrentPage === 1) return;
    onClickChangePage(groupCurrentPage - 1);
}

function onClickNextPage(totalPages) {
    if (groupCurrentPage === totalPages) return;
    onClickChangePage(groupCurrentPage + 1);
}

/**
 * SEARCH
 */

function resetGroupSearch() {
    // reset variable
    groupCurrentSearch = "";

    // reset input
    $('#group-search-input').val("");
}

function setupTriggerForGroupSearchInput() {
    $('#group-search-input').on('keypress', function (e) {
        // enter event
        if (e.which == 13) {
            const groupSearchInputValue = $('#group-search-input').val();
            if (groupSearchInputValue != groupCurrentSearch) {
                groupCurrentSearch = groupSearchInputValue;
                groupCurrentPage = 1; // reset paging
                resetGroupSort(); // reset sort
                getDataForGroupTable();
            }
        }
    });
}

/**
 * FILTER
 */
function resetGroupFilterForm() {
    resetGroupFilterFormValidator();

    // reset variable
    groupFilterMinDate = "";
    groupFilterMaxDate = "";
    groupFilterMinMember = "";
    groupFilterMaxMember = "";

    // reset input
    $("#group-filter-min-date-input").val("");
    $("#group-filter-max-date-input").val("");
    $("#group-filter-min-member-input").val("");
    $("#group-filter-max-member-input").val("");
}

function onClickGroupFilter() {

    let groupFilterMinDateInput = $("#group-filter-min-date-input").val();
    let groupFilterMaxDateInput = $("#group-filter-max-date-input").val();
    let groupFilterMinMemberInput = $("#group-filter-min-member-input").val();
    let groupFilterMaxMemberInput = $("#group-filter-max-member-input").val();

    if (groupFilterMinDate != groupFilterMinDateInput
        || groupFilterMaxDate != groupFilterMaxDateInput
        || groupFilterMinMember != groupFilterMinMemberInput
        || groupFilterMaxMember != groupFilterMaxMemberInput
    ) {
        groupFilterMinDate = groupFilterMinDateInput;
        groupFilterMaxDate = groupFilterMaxDateInput;
        groupFilterMinMember = groupFilterMinMemberInput;
        groupFilterMaxMember = groupFilterMaxMemberInput;

        groupCurrentPage = 1; // reset paging
        resetGroupSort(); // reset sort
        getDataForGroupTable();
    }
}

/**
 * SORT
 */

function resetGroupSort() {
    // reset variable
    groupCurrentSortField = "id";
    isGroupSortAsc = false;

    // hide all icons
    hideAllGroupSortIcons();
}

function hideAllGroupSortIcons() {
    $("#group-sort-icon-name").hide();
    $("#group-sort-icon-member").hide();
    $("#group-sort-icon-creator").hide();
    $("#group-sort-icon-created-date").hide();
}

function showGroupSortIcon() {

    let key;

    switch (groupCurrentSortField) {
        case "name":
            key = "#group-sort-icon-name";
            break;
        case "member":
            key = "#group-sort-icon-member"
            break;
        case "creator":
            key = "#group-sort-icon-creator";
            break;
        case "createdDate":
            key = "#group-sort-icon-created-date";
            break;
        default:
            break;
    }

    if (key) {
        hideAllGroupSortIcons();
        $(key).show();
        $(key).empty();
        if (isGroupSortAsc) {
            $(key).append(`<i data-feather="chevron-up"></i>`);
        } else {
            $(key).append(`<i data-feather="chevron-down"></i>`);
        }
        feather.replace();
    }
}

function onSortChange(key) {
    if (groupCurrentSortField == key) {
        isGroupSortAsc = !isGroupSortAsc;
    } else {
        groupCurrentSortField = key;
        isGroupSortAsc = true; // set default
    }

    showGroupSortIcon();

    groupCurrentPage = 1; // reset paging
    getDataForGroupTable();
}

function refreshTable() {
    groupCurrentPage = 1;
    resetGroupSearch();
    resetGroupFilterForm();
    resetGroupSort();

    getDataForGroupTable();
}