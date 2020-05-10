$("#status").css("display", "none");
$("#loginBtn").css("display", "none");
$("#signUpBtn").css("display", "none");
$("#signOutBtn").css("display", "none");


let userEmail = ''
//checking if the user's email is verified or not 
let database = firebase.database()
let verified = false
// showing the loading animation 
$('#loading').css("display", "block")
$('#mainContent').css("display", "none")

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $("#signOutBtn").css("display", "block");
        verified = firebase.auth().currentUser.emailVerified

        $('#loading').css("display", "block")

        if (verified) {
            // console.log(user.email, " is logged In");
            userEmail = user.email

            //checking if the visitor is a hospital staff or not 
            let allRecipientList = database.ref('userList/recipientList')
            let allHospitalEmails = []

            allRecipientList.on('value', snapshot => {
                allHospitalEmails = []
                let data = snapshot.val()
                let keys = Object.keys(snapshot.val())

                keys.forEach(element => {
                    allHospitalEmails.push(data[element].email)
                    // console.log(allHospitalEmails);
                });
                let user = firebase.auth().currentUser
                let currentUserEmail = user.email
                let userIsRecipient = allHospitalEmails.includes(currentUserEmail)
                // console.log(userIsRecipient);
                if (userIsRecipient) {
                    $("#status").css("display", "block");
                    $('#loading').css("display", "none")
                    $('#mainContent').css("display", "block")
                } else {

                    alert('You have to be a Recipient to see this page!!')
                    window.location.replace('./index.html')
                }

            })



        } else {
            alert("Verify Your Email Address to go to your dashboard")
            window.location.replace('./index.html')
        }
    } else {
        alert("Sign In to see this page!")
        window.location.replace('./index.html')
    }
});



//checking if the visitor is a hospital or not 

















$("#signOutBtn").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    alert("You are signed Out")
    location.reload
});


let rootRef = database.ref('users/recipient')

let userPathUID = ''
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


let confirmedGloves = 0
let confirmedGowns = 0
let confirmedMasks = 0
let confirmedVentilators = 0

rootRef.on('value', snapshot => {
    allDonations = []
    let hospitals = snapshot.val()

    let keys = Object.keys(hospitals)

    keys.forEach(element => {
        // getting the inventory data items value
        if (userEmail === hospitals[element].email) {
            //saving the user path
            userPathUID = element

            //matching the email to see the correct data of that specific user 
            // console.log("Email Matched");
            requiredGloves = (hospitals[element].itemRequested.gloves)
            requiredGowns = (hospitals[element].itemRequested.gowns)
            requiredMasks = (hospitals[element].itemRequested.masks)
            requiredVentilators = (hospitals[element].itemRequested.ventilators)

            //console.log(requiredGloves, requiredGowns, requiredMasks, requiredVentilators);
            if ((requiredGloves <= 0) && (requiredGowns <= 0) && (requiredMasks <= 0) && (requiredVentilators <= 0)) {
                let removingHospital = {
                    requested: false
                }

                let update = database.ref('/users/recipient' + '/' + userPathUID + '/itemRequested')
                update.update(removingHospital)

            }

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
    let dTransactionId = []

    allDonations.forEach(element => {
        // console.log(element);
        let d = Object.values(element)

        let transactionId = Object.keys(element)
        transactionId.forEach(id => {
            dTransactionId.push(id)
        });

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
    // console.log(donorName, donorAddress, donorContactInfo, dGloves, dGowns, dMasks, dVentilators);

    for (let index = 0; index < donorName.length; index++) {
        let _newRow = '<tr><td class="text-center">' + donorName[index] + '</td><td class="text-center">' + donorAddress[index] + '</td><td class="text-center">' + donorContactInfo[index] + '</td><td class="text-center">' + dGloves[index] + '</td><td class="text-center">' + dGowns[index] + '</td><td class="text-center">' + dMasks[index] + '</td><td class="text-center">' + dVentilators[index] + '</td><td class="text-center">' + dTransactionId[index] + '</td><td class="text-center">' + dConfirmation[index] + '</td></td><td class="text-center"><button class="btn btn-primary" id="confirmBtn" >Confirm</button> </td></tr>'
        $('#listing_starts').append(_newRow);

    }
    // oder button ordering 
    $('[id=confirmBtn]').click(function () {
        //gettingDonorData()
        var $row = jQuery(this).closest('tr');
        var $columns = $row.find('td');

        values = "";
        jQuery.each($columns, function (i, item) {
            values = values + 'table data' + item.innerHTML;
        });

        data = values.split("table data")
        confirmedGloves = data[4]
        confirmedGowns = data[5]
        confirmedMasks = data[6]
        confirmedVentilators = data[7]

        let cStatus = data[9]
        if (cStatus == 'Confirmed') {
            alert('The donation is already confirmed')
        } else {
            let update = database.ref('/users/recipient' + '/' + userPathUID + '/donorList/' + data[8].toString())

            updateGloves(confirmedGloves)
            updateGowns(confirmedGowns)
            updateMasks(confirmedMasks)
            updateVentilators(confirmedVentilators)

            let updateConfirmation = {
                confirmed: true
            }
            update.update(updateConfirmation)

            alert('Confirmed!')
        }



        //updating the inventory
    })

    // showing the loading animation 
    $('#loading').css("display", "none")
    $('#mainContent').css("display", "block")



})






//update functions 

function updateGloves(updatedValue, button) {
    if (button == 'update') {
        //console.log('update button pressed');
        let updatePath = database.ref('users/recipient')
        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()
            let keys = Object.keys(hospitals)
            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {
                    //matching the email to see the correct data of that specific user 

                    //console.log("email Matched");

                    database.ref('users/recipient/' + element + '/itemsAvailable').update(
                        {
                            gloves: updatedValue
                        }
                    )
                    $('#updateValueGloves').val('')



                }
            })

        })
    } else {
        let updatePath = database.ref('users/recipient')
        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()
            let keys = Object.keys(hospitals)
            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {
                    //matching the email to see the correct data of that specific user 



                    let updatedValueOfInventory = parseInt(updatedValue) + parseInt(availableGloves)
                    database.ref('users/recipient/' + element + '/itemsAvailable').update(
                        {
                            gloves: updatedValueOfInventory
                        }
                    )
                    let updatedValueOfRequests = parseInt(requiredGloves) - parseInt(updatedValue)

                    database.ref('users/recipient/' + element + '/itemRequested').update(
                        {
                            gloves: updatedValueOfRequests
                        }
                    )





                }
            })

        })
    }
    alert("Gloves quantity  updated")


}



//updating the value on the inventory 
$('#updateBtnGloves').click('click', function (params) {
    let updatedValue = $('#updateValueGloves').val()
    if (updatedValue.length == 0) {
        alert("Please enter the updated number first!")
    } else {
        updateGloves(updatedValue, 'update')
    }

})




function updateGowns(updatedValue, button) {
    if (button == 'update') {
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



                }
            })
        })
    } else {
        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {



                    let updatedValueOfInventory = parseInt(updatedValue) + parseInt(availableGowns)
                    database.ref('users/recipient/' + element + '/itemsAvailable').update(
                        {
                            gowns: updatedValueOfInventory
                        }
                    )
                    let updatedValueOfRequests = parseInt(requiredGowns) - parseInt(updatedValue)
                    database.ref('users/recipient/' + element + '/itemRequested').update(
                        {
                            gowns: updatedValueOfRequests
                        }
                    )





                }
            })
        })
    }
    alert("Gowns quantity  updated")

}





$('#updateBtnGowns').click('click', function (params) {
    let updatedValue = $('#updateValueGowns').val()

    if (updatedValue.length == 0) {
        alert("Please enter the updated number first!")
    } else {
        updateGowns(updatedValue, 'update')
    }



})

function updateMasks(updatedValue, button) {
    if (button == 'update') {
        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {

                    database.ref('users/recipient/' + element + '/itemsAvailable').update(
                        {
                            masks: updatedValue
                        }
                    )
                    $('#updateValueMasks').val('')


                }
            })
        })
    } else {
        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {



                    let updatedValueOfInventory = parseInt(updatedValue) + parseInt(availableMasks)
                    database.ref('users/recipient/' + element + '/itemsAvailable').update(
                        {
                            masks: updatedValueOfInventory
                        }
                    )
                    let updatedValueOfRequests = parseInt(requiredMasks) - parseInt(updatedValue)
                    database.ref('users/recipient/' + element + '/itemRequested').update(
                        {
                            masks: updatedValueOfRequests
                        }
                    )



                }
            })
        })
    }
    alert("Masks quantity  updated")

}

$('#updateBtnMasks').click('click', function (params) {
    let updatedValue = $('#updateValueMasks').val()


    if (updatedValue.length == 0) {
        alert("Please enter the updated number first!")
    } else {
        updateMasks(updatedValue, 'update')
    }


})



function updateVentilators(updatedValue, button) {
    if (button == 'update') {
        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {

                    database.ref('users/recipient/' + element + '/itemsAvailable').update(
                        {
                            ventilators: updatedValue
                        }
                    )
                    $('#updateValueVentilators').val('')

                }
            })
        })
    } else {
        let updatePath = database.ref('users/recipient')

        updatePath.once('value', snapshot => {
            let hospitals = snapshot.val()

            let keys = Object.keys(hospitals)

            keys.forEach(element => {
                // getting the inventory data items value
                if (userEmail === hospitals[element].email) {




                    let updatedValueOfInventory = parseInt(updatedValue) + parseInt(availableVentilators)
                    database.ref('users/recipient/' + element + '/itemsAvailable').update(
                        {
                            ventilators: updatedValueOfInventory
                        }
                    )
                    let updatedValueOfRequests = parseInt(requiredVentilators) - parseInt(updatedValue)
                    database.ref('users/recipient/' + element + '/itemRequested').update(
                        {
                            ventilators: updatedValueOfRequests
                        }
                    )



                }
            })
        })
    }
    alert('Ventilator quantity  updated')

}

$('#updateBtnVentilators').click('click', function (params) {
    let updatedValue = $('#updateValueVentilators').val()

    if (updatedValue.length == 0) {
        alert("Please enter the updated number first!")
    } else {
        updateVentilators(updatedValue, 'update')
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
