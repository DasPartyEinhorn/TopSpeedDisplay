var displaySize = 10;
var childList = JSON.parse(localStorage.getItem('childList')) | [{name: 'Max Tester', speed: 25.5}];
var parentList = JSON.parse(localStorage.getItem('parentList')) | [{name: 'John Mustermann', speed: 25.5}];

$(document).ready(function () {

    // localStorage.setItem('childList', JSON.stringify(childList));
    loadChildList();
    sortChildList();
    updateChildList();

    loadParentList();
    sortChildList();
    updateParentList();

    updateWorker();
});


function updateWorker() {
    console.log('run update Worker');
    setTimeout( function() {
        loadChildList();
        sortChildList();
        updateChildList();

        loadParentList();
        sortChildList();
        updateParentList();

        updateWorker();
    }, 2000);
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

function sortChildList() {
    childList.sort(function(a, b) {
        return parseFloat(b.speed) - parseFloat(a.speed);
    });
}
function sortParentList() {
    parentList.sort(function(a, b) {
        return parseFloat(b.speed) - parseFloat(a.speed);
    });
}

function updateChildList() {
    $("#child_board_list").empty();
    sortChildList();
    $.each(childList.slice(0, displaySize), function( index, obj ) {
        // console.log(index);
        count = parseInt(index)+1;
        $("#child_board_list").append('<li class="list-group-item"> <span class="badge">' + count +'</span> ' + obj.speed + ' km/h - ' + obj.name + '</li>\n');
    });
}

function updateParentList() {
    $("#parent_board_list").empty();
    sortParentList();
    $.each(parentList.slice(0, displaySize), function( index, obj ) {
        // console.log(index);
        count = parseInt(index)+1;
        $("#parent_board_list").append('<li class="list-group-item"> <span class="badge">' + count +'</span> ' + obj.speed + ' km/h - ' + obj.name + '</li>\n');
    });
}
