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
let contactInfoList = []
let district = []
let gloves = []
let gowns = []
let masks = []
let ventilators = []

let data = ''
let values = ''


let donatedItems = {}
let donorInfo = {}

let findDistrict = ''
let findArea = ''

$('#findHosp').click(function (e) {
    e.preventDefault();

    findDistrict = $("#districtHospital option:selected").text();
    findArea = $("#findHospArea").val()
    let empty = false
    if (findDistrict == 'Choose District') {
        alert("Choose district")
        empty = true
    }
    if (findArea == '') {
        alert("Choose Area")
        empty = true
    }
    if (!empty) {
        // console.log("Data filled");
        // console.log(findDistrict, findArea);
        findArea.toLocaleLowerCase

        update(findArea, findDistrict)
        $("#districtHospital").val(0);
        $("#findHospArea").val('')
    }





});




function update(findArea, findDistrict) {

    rootRef.once('value', snapshot => {

        requested = false
        namesList = []
        addressList = []
        contactInfoList
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

            let str = hospitals[element].area
            let tempArea = str.toLocaleLowerCase()

            findArea = findArea.toLocaleLowerCase()


            if (hospitals[element].district == findDistrict && tempArea == findArea) {
                if (requested) {
                    namesList.push(hospitals[element].name)
                    addressList.push(hospitals[element].address)
                    contactInfoList.push(hospitals[element].phoneNumber)

                    area.push(hospitals[element].area)
                    district.push(hospitals[element].district)


                    gloves.push(hospitals[element].itemRequested.gloves)
                    gowns.push(hospitals[element].itemRequested.gowns)
                    masks.push(hospitals[element].itemRequested.masks)
                    ventilators.push(hospitals[element].itemRequested.ventilators)
                }

            }
            $('#listing_starts').empty();







        });

        for (let index = 0; index < namesList.length; index++) {
            let _newRow = '<tr><td class="text-center">' + namesList[index] + '</td><td class="text-center">' + addressList[index] + '</td></td><td class="text-center">' + contactInfoList[index] + '</td><td class="text-center">' + area[index] + '</td><td class="text-center">' + district[index] + '</td><td class="text-center">' + gloves[index] + '</td><td class="text-center">' + gowns[index] + '</td><td class="text-center">' + masks[index] + '</td></td><td class="text-center">' + ventilators[index] + '</td><td class="text-center"><button class="btn btn-success" id="orderBtn" >Donate Now</button> </td></tr>'
            $('#listing_starts').append(_newRow);

        }


        // oder button ordering 
        $('[id=orderBtn]').click(function () {

            let userLoggedIn = checkingLoggedIn()

            // console.log(userLoggedIn);
            if (userLoggedIn) {
                //gettingDonorData()

                var $row = jQuery(this).closest('tr');
                var $columns = $row.find('td');

                values = "";
                jQuery.each($columns, function (i, item) {
                    values = values + 'table data' + item.innerHTML;
                });

                data = values.split("table data")


                //console.log(data);
                $('#infoDonate').css("display", "block");
                // console.log(data);



                $('#hospitalName').text(
                    $('#hospitalName').text() + data[1]
                )
                $('#hospitalAddress').text(
                    $('#hospitalAddress').text() + data[2]
                )
                $('#hospitalContactInfo').text(
                    $('#hospitalContactInfo').text() + data[3]
                )



            } else {
                alert("You have to login to donate")
            }

        })



    })
}





rootRef.on('value', snapshot => {

    requested = false

    namesList = []
    addressList = []
    contactInfoList = []
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
            contactInfoList.push(hospitals[element].phoneNumber)

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
        let _newRow = '<tr><td class="text-center">' + namesList[index] + '</td><td class="text-center">' + addressList[index] + '</td></td><td class="text-center">' + contactInfoList[index] + '</td><td class="text-center">' + area[index] + '</td><td class="text-center">' + district[index] + '</td><td class="text-center">' + gloves[index] + '</td><td class="text-center">' + gowns[index] + '</td><td class="text-center">' + masks[index] + '</td></td><td class="text-center">' + ventilators[index] + '</td><td class="text-center"><button class="btn btn-success" id="orderBtn" >Donate Now</button> </td></tr>'
        $('#listing_starts').append(_newRow);

    }


    // oder button ordering 
    $('[id=orderBtn]').click(function () {

        let userLoggedIn = checkingLoggedIn()

        // console.log(userLoggedIn);
        if (userLoggedIn) {
            //gettingDonorData()

            var $row = jQuery(this).closest('tr');
            var $columns = $row.find('td');

            values = "";
            jQuery.each($columns, function (i, item) {
                values = values + 'table data' + item.innerHTML;
            });

            data = values.split("table data")

            console.log(data);



            $('#infoDonate').css("display", "block");
            // console.log(data);


            $('#hospitalName').text(
                $('#hospitalName').text() + data[1]
            )
            $('#hospitalAddress').text(
                $('#hospitalAddress').text() + data[2]
            )
            $('#hospitalContactInfo').text(
                $('#hospitalContactInfo').text() + data[3]
            )


        } else {
            alert("You have to login to donate")
        }

    })



})
$('#donateNowBtn').click(function () {


    let gloves = $('#inputGloves').val()
    let gowns = $('#inputGowns').val()
    let masks = $('#inputMasks').val()
    let ventilators = $('#inputVentilators').val()

    let eGloves = false
    let eGowns = false
    let eMask = false
    let eVentilators = false

    donatedItems = {
        "gloves": gloves,
        "gowns": gowns,
        "masks": masks,
        "ventilators": ventilators
    }
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

        // console.log('gloves: ', gloves, 'gowns: ', gowns, 'masks: ', masks, 'ventilators: ', ventilators);
        donating()
        $('#inputGloves').val('')
        $('#inputGowns').val('')
        $('#inputMasks').val('')
        $('#inputVentilators').val('')
    } else {
        alert("Please fill any of the items")
    }


})

function successfullcallBack() {
    console.log(donorInfo);
}
function rejected() {

}





function gettingDonorData() {
    let donorUser = firebase.auth().currentUser
    let donorEmail = donorUser.email
    let donorInfoPath = database.ref('users/donor')
    return new Promise((resolve, rejected) => {
        donorInfoPath.once('value', snapshot => {
            let allDonor = snapshot.val()
            let keysOfDonorList = Object.keys(allDonor)
            keysOfDonorList.forEach(element => {
                if (allDonor[element].email == donorEmail) {
                    donorInfo = {
                        name: allDonor[element].name,
                        email: allDonor[element].email,
                        address: allDonor[element].address,
                        nidNumber: allDonor[element].nidNumber,
                        phoneNumber: allDonor[element].phoneNumber
                    }

                    //console.log(donorInfo.email);
                }
                //console.log(donorInfo.email);
            })
        })
        resolve("Data updated")
    })

}

function donating() {
    let donatePath = database.ref('users/recipient')
    let name = data[1]

    donatePath.once('value', snap => {
        let hospitalList = snap.val()

        let keysOfHospitalList = Object.keys(hospitalList)

        keysOfHospitalList.forEach(element => {


            if (name == hospitalList[element].name) {
                let path = database.ref('users/recipient' + '/' + element + '/donorList')
                //console.log(donatedItems);
                let allData = {
                    itemInfo: donatedItems,
                    donorInfo: donorInfo,
                    confirmed: false
                }
                // console.log(donatedItems);
                // console.log(donorInfo);
                //console.log(donorInfo.email);
                path.push(allData)
                alert('Donation Successful');
            }
        })
    })
}

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
        // console.log(user.email, "is signed in.");
        $("#status").css("display", "block");
        $("#signOutBtn").css("display", "block");
        //if there's an user logged in then collect the data in the donorInfo object
        gettingDonorData()
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

