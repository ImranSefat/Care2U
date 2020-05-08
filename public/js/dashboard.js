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




rootRef.on('value', snapshot => {



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

