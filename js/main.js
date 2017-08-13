var childList = [{name: 'Simon', speed: 25.5}];
var parentList = [{name: 'Dr. Hausen', speed: 25.5}];

$(document).ready(function () {


    localStorage.setItem('childList', JSON.stringify(childList));


    var retrievedObject = localStorage.getItem('childList');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));

});

$('#child_input').submit(function (e) {
    e.preventDefault();

    var name = $('#child_name_input').val();
    var speed = $('#child_speed_input').val();

    childList.push({name: name, speed: speed});

    saveChildListToStorage();
    updateChildList();

    $('#child_input')[0].reset();

    console.log(childList);

    return false;
});

function saveChildListToStorage() {
    localStorage.setItem('childList', JSON.stringify(childList));
}

function saveParentListToStorage() {
    localStorage.setItem('parentList', JSON.stringify(parentList));
}

function loadCildList() {
    childList = localStorage.getItem('childList');
}

function loadCildList() {
    parentList = localStorage.getItem('parentList');
}

function updateChildList() {
    $("#child_list").empty();
    sortChildList();
    $.each(childList, function( index, obj ) {
        console.log(index);
        count = parseInt(index)+1;
        $("#child_list").append('<li class="list-group-item"> <span class="badge">' + count +'</span>' + obj.name + ' - ' + obj.speed + ' km/h <div class="align_right"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></div></li>\n');
    });
}

function sortChildList() {
    childList.sort(function(a, b) {
        return parseFloat(b.speed) - parseFloat(a.speed);
    });
}



