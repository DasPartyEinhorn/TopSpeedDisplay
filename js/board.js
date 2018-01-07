var displaySize = 10;
var childList = JSON.parse(localStorage.getItem('childList')) | [{name: 'Max Tester', speed: 25.5}];
var parentList = JSON.parse(localStorage.getItem('parentList')) | [{name: 'John Mustermann', speed: 25.5}];
var settings = {showCount: 10, backgroundLink: ''};

$(document).ready(function () {

    // localStorage.setItem('childList', JSON.stringify(childList));
    loadChildList();
    sortChildList();
    updateChildList();

    loadParentList();
    sortChildList();
    updateParentList();

    loadSettings();

    updateWorker();
});

function loadSettings() {
    var newSettings = JSON.parse(localStorage.getItem('settings'));

    if (newSettings.showCount !== settings.newCount || newSettings.backgroundLink !== settings.backgroundLink) {
        settings = newSettings;
        displaySize = settings.showCount;

        setBackgoundImage();
    }
}

function setBackgoundImage() {
    var board = $('.board');
    if (settings.backgroundLink.indexOf(board.css('background-image')) <= 0 ){
        board.css('background-image', 'url(' + settings.backgroundLink + ')');
    }
}

function updateWorker() {
    console.log('run update Worker');
    setTimeout(function () {
        loadChildList();
        sortChildList();
        updateChildList();

        loadParentList();
        sortChildList();
        updateParentList();

        loadSettings();

        updateWorker();

    }, 2000);
}

function loadChildList() {
    var local = JSON.parse(localStorage.getItem('childList'));
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

function sortChildList() {
    childList.sort(function (a, b) {
        return parseFloat(b.speed) - parseFloat(a.speed);
    });
    childList.slice(0, settings.showCount);
}

function sortParentList() {
    parentList.sort(function (a, b) {
        return parseFloat(b.speed) - parseFloat(a.speed);
    });
    parentList.slice(0, settings.showCount);

}

function updateChildList() {
    $("#child_board_list").empty();
    sortChildList();
    $.each(childList.slice(0, displaySize), function (index, obj) {
        count = parseInt(index) + 1;
        $("#child_board_list").append('<li class="list-group-item"> <span class="badge">' + count + '</span> ' + obj.speed + ' km/h - ' + obj.name + '</li>\n');
    });
}

function updateParentList() {
    $("#parent_board_list").empty();
    sortParentList();
    $.each(parentList.slice(0, displaySize), function (index, obj) {
        count = parseInt(index) + 1;
        $("#parent_board_list").append('<li class="list-group-item"> <span class="badge">' + count + '</span> ' + obj.speed + ' km/h - ' + obj.name + '</li>\n');
    });
}
