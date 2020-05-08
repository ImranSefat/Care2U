//initializing database
let database = firebase.database()
let rootRef = database.ref('users/recipient')

let namesList = []
let addressList = []
let area = []
let district = []
let gloves = []
let gowns = []
let masks = []
let ventilators = []
// $('#listing_starts').remove();



rootRef.on('value', snapshot => {

    namesList = []
    addressList = []
    area = []
    district = []
    gloves = []
    gowns = []
    masks = []
    ventilators = []
    let hospitals = snapshot.val()

    let keys = Object.keys(hospitals)

    keys.forEach(element => {
        // getting all the data 
        namesList.push(hospitals[element].name)
        addressList.push(hospitals[element].address)

        area.push(hospitals[element].area)
        district.push(hospitals[element].district)

        gloves.push(hospitals[element].itemRequested.gloves)
        gowns.push(hospitals[element].itemRequested.gowns)
        masks.push(hospitals[element].itemRequested.masks)
        ventilators.push(hospitals[element].itemRequested.ventilators)

        $('#listing_starts').empty();



    });

    for (let index = 0; index < namesList.length; index++) {
        let _newRow = '<tr><td class="text-center">' + namesList[index] + '</td><td class="text-center">' + addressList[index] + '</td><td class="text-center">' + area[index] + '</td><td class="text-center">' + district[index] + '</td><td class="text-center">' + gloves[index] + '</td><td class="text-center">' + gowns[index] + '</td><td class="text-center">' + masks[index] + '</td></td><td class="text-center">' + ventilators[index] + '</td><td class="text-center"><button class="btn btn-success" id="orderBtn" >Donate Now</button> </td></tr>'
        $('#listing_starts').append(_newRow);

    }


    // oder button ordering 
    $('[id=orderBtn]').click(function () {

        var $row = jQuery(this).closest('tr');
        var $columns = $row.find('td');

        var values = "";
        jQuery.each($columns, function (i, item) {
            values = values + ' td' + (i + 1) + ': ' + item.innerHTML;

        });
        console.log(values);
    })


})



//Checking the auth state and if there's no user then status button and signOut button will no longer be visible

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email, "is signed in.");
        $("#loginBtn").css("display", "none");
        $("#signUpBtn").css("display", "none");


    } else {
        console.log("None Found.");
        $("#status").css("display", "none");
        $("#signOutBtn").css("display", "none");


    }
});
