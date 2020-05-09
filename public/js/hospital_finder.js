$("#status").css("display", "none");
$("#loginBtn").css("display", "none");
$("#signUpBtn").css("display", "none");
$("#signOutBtn").css("display", "none");
$('#infoDonate').css("display", "none");
//initializing database
let database = firebase.database()
let rootRef = database.ref('users/recipient')

let requested = false

let namesList = []
let addressList = []
let area = []
let district = []
let gloves = []
let gowns = []
let masks = []
let ventilators = []

let data = ''
let values = ''

rootRef.on('value', snapshot => {

    requested = false

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

        requested = (hospitals[element].itemRequested.requested)
        if (requested) {
            namesList.push(hospitals[element].name)
            addressList.push(hospitals[element].address)

            area.push(hospitals[element].area)
            district.push(hospitals[element].district)


            gloves.push(hospitals[element].itemRequested.gloves)
            gowns.push(hospitals[element].itemRequested.gowns)
            masks.push(hospitals[element].itemRequested.masks)
            ventilators.push(hospitals[element].itemRequested.ventilators)
        } else {

        }



        $('#listing_starts').empty();



    });

    for (let index = 0; index < namesList.length; index++) {
        let _newRow = '<tr><td class="text-center">' + namesList[index] + '</td><td class="text-center">' + addressList[index] + '</td><td class="text-center">' + area[index] + '</td><td class="text-center">' + district[index] + '</td><td class="text-center">' + gloves[index] + '</td><td class="text-center">' + gowns[index] + '</td><td class="text-center">' + masks[index] + '</td></td><td class="text-center">' + ventilators[index] + '</td><td class="text-center"><button class="btn btn-success" id="orderBtn" >Donate Now</button> </td></tr>'
        $('#listing_starts').append(_newRow);

    }


    // oder button ordering 
    $('[id=orderBtn]').click(function () {

        let userLoggedIn = checkingLoggedIn()

        // console.log(userLoggedIn);
        if (userLoggedIn) {

            var $row = jQuery(this).closest('tr');
            var $columns = $row.find('td');

            values = "";
            jQuery.each($columns, function (i, item) {
                values = values + 'table data' + item.innerHTML;
            });

            data = values.split("table data")


            //console.log(data);
            $('#infoDonate').css("display", "block");
            console.log(data);


        } else {
            alert("You have to login to donate")
        }

    })

    $('#donateNowBtn').click(function () {
        //alert('asdasd');
        let gloves = $('#inputGloves').val()
        let gowns = $('#inputGowns').val()
        let masks = $('#inputMasks').val()
        let ventilators = $('#inputVentilators').val()

        let eGloves = false
        let eGowns = false
        let eMask = false
        let eVentilators = false

        if (gloves != 0) {
            eGloves = true
        }
        if (gowns != 0) {
            eGowns = true
        }
        if (masks != 0) {
            eMask = true
        }
        if (ventilators != 0) {
            eVentilators = true
        }


        let filled = eGloves || eGowns || eMask || eVentilators


        if (filled) {
            console.log(data);
            console.log('gloves: ', gloves, 'gowns: ', gowns, 'masks: ', masks, 'ventilators: ', ventilators);
        } else {
            alert("Please fill any of the items")
        }


    })

})

//checking if user is logged in to donate 

function checkingLoggedIn() {
    let user = firebase.auth().currentUser
    if (user) {
        return true
    } else {
        return false
    }

}




//Checking the auth state and if there's no user then status button and signOut button will no longer be visible

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email, "is signed in.");
        $("#status").css("display", "block");
        $("#signOutBtn").css("display", "block");

    } else {
        console.log("None Found.");

        $("#loginBtn").css("display", "block");
        $("#signUpBtn").css("display", "block");

    }
});





$("#signOutBtn").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    location.reload
});

