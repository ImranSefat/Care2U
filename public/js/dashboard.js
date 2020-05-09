$("#status").css("display", "none");
$("#loginBtn").css("display", "none");
$("#signUpBtn").css("display", "none");
$("#signOutBtn").css("display", "none");


let userEmail = ''
//checking if the user's email is verified or not 
let database = firebase.database()
let verified = false
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $("#signOutBtn").css("display", "block");
        verified = firebase.auth().currentUser.emailVerified


        if (verified) {
            console.log(user.email, " is logged In");
            userEmail = user.email
        } else {
            alert("Verify Your Email Address to go to your dashboard")
            window.location.replace('../index.html')
        }
    } else {
        alert("Sign In to see this page!")
        window.location.replace('../index.html')
    }
});



$("#signOutBtn").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    location.reload
});


let rootRef = database.ref('users/recipient')
//items in the available section
let availableGloves = 0
let availableGowns = 0
let availableMasks = 0
let availableVentilators = 0

//items in the requested section
let requiredGloves = 0
let requiredGowns = 0
let requiredMasks = 0
let requiredVentilators = 0

//all the donations 
let allDonations = []

rootRef.on('value', snapshot => {
    allDonations = []
    let hospitals = snapshot.val()

    let keys = Object.keys(hospitals)

    keys.forEach(element => {
        // getting the inventory data items value
        if (userEmail === hospitals[element].email) {
            //matching the email to see the correct data of that specific user 
            // console.log("Email Matched");
            requiredGloves = (hospitals[element].itemRequested.gloves)
            requiredGowns = (hospitals[element].itemRequested.gowns)
            requiredMasks = (hospitals[element].itemRequested.masks)
            requiredVentilators = (hospitals[element].itemRequested.ventilators)

            availableGloves = (hospitals[element].itemsAvailable.gloves)
            availableGowns = (hospitals[element].itemsAvailable.gowns)
            availableMasks = (hospitals[element].itemsAvailable.masks)
            availableVentilators = (hospitals[element].itemsAvailable.ventilators)

            //collecting the donorlist
            allDonations.push(hospitals[element].donorList)

        }




    });

    // console.log(requiredGloves, requiredGowns, requiredMasks, requiredVentilators);

    //setting the available data 
    $('#availableGloves').text("Available : " + availableGloves)
    $('#availableGowns').text("Available : " + availableGowns)
    $('#availableMasks').text("Available : " + availableMasks)
    $('#availableVentilators').text("Available : " + availableVentilators)

    //setting the required data 
    $('#requestedGloves').text("Requested : " + requiredGloves)
    $('#requestedGowns').text("Requested : " + requiredGowns)
    $('#requestedMasks').text("Requested : " + requiredMasks)
    $('#requestedVentilators').text("Requested : " + requiredVentilators)

    //taking all the donations
    let donorName = []
    let donorAddress = []
    let donorContactInfo = []

    let dGloves = []
    let dGowns = []
    let dMasks = []
    let dVentilators = []
    let dConfirmation = []

    allDonations.forEach(element => {
        // console.log(element);
        let d = Object.values(element)
        d.forEach(elem => {
            donorName.push(elem.donorInfo.name)
            donorAddress.push(elem.donorInfo.address)
            donorContactInfo.push(elem.donorInfo.phoneNumber)

            if (elem.confirmed == false) {
                dConfirmation.push("Not Confirmed")
            } else {
                dConfirmation.push("Confirmed")
            }


            if (elem.itemInfo.gloves == "") {
                dGloves.push("0")
            } else {
                dGloves.push(elem.itemInfo.gloves)
            }


            if (elem.itemInfo.gowns == "") {
                dGowns.push("0")
            } else {
                dGowns.push(elem.itemInfo.gowns)
            }


            if (elem.itemInfo.masks == "") {
                dMasks.push("0")
            } else {
                dMasks.push(elem.itemInfo.masks)
            }


            if (elem.itemInfo.ventilators == "") {
                dVentilators.push("0")
            } else {
                dVentilators.push(elem.itemInfo.ventilators)
            }

        });
        $('#listing_starts').empty();

    });
    console.log(donorName, donorAddress, donorContactInfo, dGloves, dGowns, dMasks, dVentilators);

    for (let index = 0; index < donorName.length; index++) {
        let _newRow = '<tr><td class="text-center">' + donorName[index] + '</td><td class="text-center">' + donorAddress[index] + '</td></td><td class="text-center">' + donorContactInfo[index] + '</td><td class="text-center">' + dGloves[index] + '</td><td class="text-center">' + dGowns[index] + '</td><td class="text-center">' + dMasks[index] + '</td><td class="text-center">' + dVentilators[index] + '</td><td class="text-center">' + dConfirmation[index] + '</td></td><td class="text-center"><button class="btn btn-primary" id="orderBtn" >Confirm</button> </td></tr>'
        $('#listing_starts').append(_newRow);

    }

})




//updating the value on the inventory 
$('#updateBtnGloves').click('click', function (params) {
    let updatedValue = $('#updateValueGloves').val()

    if (updatedValue.length == 0) {
        alert("Please enter the updated number first!")
    } else {

        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {
                    //matching the email to see the correct data of that specific user 

                    console.log("email Matched");
                    database.ref('users/recipient/' + element + '/itemsAvailable').update(
                        {
                            gloves: updatedValue
                        }
                    )
                    $('#updateValueGloves').val('')
                    alert("Updated")



                }
            })


        })
    }

})


$('#updateBtnGowns').click('click', function (params) {
    let updatedValue = $('#updateValueGowns').val()

    if (updatedValue.length == 0) {
        alert("Please enter the updated number first!")
    } else {

        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {

                    // console.log("email Matched");
                    database.ref('users/recipient/' + element + '/itemsAvailable').update(
                        {
                            gowns: updatedValue
                        }
                    )
                    $('#updateValueGowns').val('')
                    alert("Updated")



                }
            })
        })
    }

})



$('#updateBtnMasks').click('click', function (params) {
    let updatedValue = $('#updateValueMasks').val()


    if (updatedValue.length == 0) {
        alert("Please enter the updated number first!")
    } else {

        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {
                    // console.log("email Matched");
                    database.ref('users/recipient/' + element + '/itemsAvailable').update(
                        {
                            masks: updatedValue
                        }
                    )
                    $('#updateValueMasks').val('')
                    alert("Updated")

                }
            })
        })
    }

})



$('#updateBtnVentilators').click('click', function (params) {
    let updatedValue = $('#updateValueVentilators').val()

    if (updatedValue.length == 0) {
        alert("Please enter the updated number first!")
    } else {

        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {
                    // console.log("email Matched");
                    database.ref('users/recipient/' + element + '/itemsAvailable').update(
                        {
                            ventilators: updatedValue
                        }
                    )
                    $('#updateValueVentilators').val('')
                    alert("Updated")

                }
            })
        })
    }
})




// requesting data updating 
$('#requestBtnGloves').click('click', function (params) {
    let requestedValue = $('#requestValueGloves').val()
    if (requestedValue.length == 0) {
        alert("Please enter how many first!")
    } else {

        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {
                    // console.log("email Matched");
                    database.ref('users/recipient/' + element + '/itemRequested').update(
                        {
                            gloves: requestedValue,
                            requested: true
                        }
                    )
                    $('#requestValueGloves').val('')
                    alert("Updated")

                }
            })
        })
    }
})







$('#requestBtnGowns').click('click', function (params) {
    let requestedValue = $('#requestValueGowns').val()

    if (requestedValue.length == 0) {
        alert("Please enter how many first!")
    } else {

        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {
                    // console.log("email Matched");
                    database.ref('users/recipient/' + element + '/itemRequested').update(
                        {
                            gowns: requestedValue,
                            requested: true
                        }
                    )
                    $('#requestValueGowns').val('')
                    alert("Updated")

                }
            })
        })
    }
})









$('#requestBtnMasks').click('click', function (params) {
    let requestedValue = $('#requestValueMasks').val()

    if (requestedValue.length == 0) {
        alert("Please enter how many first!")
    } else {

        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {
                    // console.log("email Matched");
                    database.ref('users/recipient/' + element + '/itemRequested').update(
                        {
                            masks: requestedValue,
                            requested: true
                        }
                    )
                    $('#requestValueMasks').val('')
                    alert("Updated")

                }
            })
        })
    }
})






$('#requestBtnVentilators').click('click', function (params) {
    let requestedValue = $('#requestValueVentilators').val()

    if (requestedValue.length == 0) {
        alert("Please enter how many first!")
    } else {

        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {
                    // console.log("email Matched");
                    database.ref('users/recipient/' + element + '/itemRequested').update(
                        {
                            ventilators: requestedValue,
                            requested: true
                        }
                    )
                    $('#requestValueVentilators').val('')
                    alert("Updated")

                }
            })
        })
    }
})
