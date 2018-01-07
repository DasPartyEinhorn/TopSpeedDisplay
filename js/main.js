var childList = [{name: 'Max Tester', speed: 25.5}];
var parentList = [{name: 'John Mustermann', speed: 25.5}];
var settings = {showCount: 10, backgroundLink: ''};

$(document).ready(function () {

    // localStorage.setItem('childList', JSON.stringify(childList));
    console.log(childList);

    loadChildList();
    console.log(childList);

    updateChildList();
    console.log(childList);

    loadParentList();
    updateParentList();

});

// submit of child input form
$('#child_input').submit(function (e) {
    e.preventDefault();
    var name = $('#child_name_input').val();
    var speed = $('#child_speed_input').val();
    speed = speed.replace(',', '.');
    childList.push({name: name, speed: speed});
    saveChildListToStorage();
    updateChildList();
    $('#child_input')[0].reset();

    $('#child_name_input').focus();
    return false;
});

// submit of parent submit form
$('#parent_input').submit(function (e) {
    e.preventDefault();
    var name = $('#parent_name_input').val();
    var speed = $('#parent_speed_input').val();
    speed = speed.replace(',', '.');
    parentList.push({name: name, speed: speed});
    saveParentListToStorage();
    updateParentList();
    $('#parent_input')[0].reset();

    $('#parent_name_input').focus();
    return false;
});

// submit of parent submit form
$('#settings-form').submit(function (e) {
    e.preventDefault();

    var count = $('#settings-show-count').val();
    var background = $('#settings-background-image').val();

    settings.showCount = count;
    settings.backgroundLink = background;

    saveSettingsToStorage();
    return false;
});

// click listener for delete child entry
$(document).on('click', '.delete_icon_wrapper_child', function () {
    console.log('nth: ', $(this).parent('li').index());
    var nth_element = $(this).parent('li').index();
    childList.splice(nth_element, 1);
    saveChildListToStorage();
    updateChildList();
});
// click listener for delete parent entry
$(document).on('click', '.delete_icon_wrapper_parent', function () {
    console.log('nth: ', $(this).parent('li').index());
    var nth_element = $(this).parent('li').index();
    parentList.splice(nth_element, 1);
    saveParentListToStorage();
    updateParentList();
});

function saveChildListToStorage() {
    localStorage.setItem('childList', JSON.stringify(childList));
}

function saveParentListToStorage() {
    localStorage.setItem('parentList', JSON.stringify(parentList));
}

function saveSettingsToStorage() {
    localStorage.setItem('settings', JSON.stringify(settings));

}

function loadChildList() {

    var local = JSON.parse(localStorage.getItem('childList'));
    console.log('local', local);
    if (local) {
        childList = local;
    }
}

function loadParentList() {
    var local = JSON.parse(localStorage.getItem('parentList'));
    if (local) {
        parentList = local;
    }
}

function updateChildList() {
    $("#child_list").empty();
    sortChildList();
    $.each(childList, function (index, obj) {
        console.log(index);
        count = parseInt(index) + 1;
        $("#child_list").append('<li class="list-group-item"> <span class="badge">' + count + '</span>' + obj.name + ' - ' + obj.speed + ' km/h <div class="align_right delete_icon_wrapper_child"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></div></li>\n');
    });
}

function updateParentList() {
    $("#parent_list").empty();
    sortParentList();
    $.each(parentList, function (index, obj) {
        console.log(index);
        count = parseInt(index) + 1;
        $("#parent_list").append('<li class="list-group-item"> <span class="badge">' + count + '</span>' + obj.name + ' - ' + obj.speed + ' km/h <div class="align_right delete_icon_wrapper_parent"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></div></li>\n');
    });
}

function sortChildList() {
    childList.sort(function (a, b) {
        return parseFloat(b.speed) - parseFloat(a.speed);
    });

}

function sortParentList() {
    parentList.sort(function (a, b) {
        return parseFloat(b.speed) - parseFloat(a.speed);
    });
}

function getMax(arr, prop) {
    var max;
    for (var i = 0; i < arr.length; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

