//checking if a user is signed in

// database testing 


let database = firebase.database()



// receipent sign up 
$("#signUpBtnRecp").click(function (e) {
    e.preventDefault();
    let name = $("#inputNameRcpt").val()
    let phoneNumber = $("#inputPhoneNumberRcpt").val()

    let email = $("#inputEmailRcpt").val()
    let password = $("#inputPasswordRcpt").val()
    let rePassword = $("#inputPasswordConfirmRcpt").val()

    let regNo = $("#inputRegNumberRcpt").val()
    let address = $("#inputAddressRcpt").val()
    let area = $("#inputAreaRcpt").val()
    let district = $("#districtRcpt option:selected").text();


    // email address validation 
    let valid = validateEmail(email)

    let accountType = 'recipient'



    let invalid = false
    if (valid) {
        if (password === rePassword) {
            if (password.length < 8) {
                alert("has to be 8 digit or more")
                invalid = true
            }
            if (name.length == 0) {
                alert("Name cannot be empty")
                invalid = true
            }
            if (phoneNumber.length < 11) {
                alert("Phone Number Cannot be lesse than 11 digits")
                invalid = true
            }
            if (regNo.length < 8) {
                alert("Registration Number Cannot be lesse than 8 digits")
                invalid = true
            }
            if (address.length == 0) {
                alert("Address cannot be empty")
                invalid = true
            }
            if (area.length == 0) {
                alert("Area cannot be empty")
                invalid = true
            }
            if (district == 'Choose') {
                alert("Choose a District")
                invalid = true
            }
            if (!invalid) {
                let dataOfUser = {
                    name: name,
                    phoneNumber: phoneNumber,
                    email: email,
                    regNo: regNo,
                    address: address,
                    area: area,
                    district: district,
                    donorList: [
                        {
                            item: {
                                gloves: 0,
                                gowns: 0,
                                masks: 0,
                                ventilators: 0
                            },
                            name: "who donated"
                        }
                    ]
                    ,
                    itemRequested: {
                        gloves: 0,
                        gowns: 0,
                        masks: 0,
                        ventilators: 0,
                        requested: false
                    },
                    itemsAvailable: {
                        gloves: 0,
                        gowns: 0,
                        masks: 0,
                        ventilators: 0
                    },
                }
                createAccount(email, password, accountType, dataOfUser)


            }


        } else {
            alert("Please check your password")
        }
    }


});





// donor sign up


$("#donorSignUpBtn").click(function (e) {
    e.preventDefault();
    let name = $("#donorName").val()
    let phoneNumber = $("#donorPhone").val()

    let email = $("#donorEmail").val()
    let password = $("#donorPassword").val()
    let rePassword = $("#donorPasswordConfirm").val()

    let nidNumber = $("#donorNidNumber").val()

    let address = $("#donorAddress").val()
    let area = $("#donorArea").val()
    let district = $("#donorDistrict option:selected").text();



    // email address validation 
    let valid = validateEmail(email)

    let accountType = 'donor'
    let invalid = false
    if (valid) {
        if (password === rePassword) {
            if (password.length < 8) {
                alert("has to be 8 digit or more")
                invalid = true
            }
            if (name.length == 0) {
                alert("Name cannot be empty")
                invalid = true
            }
            if (phoneNumber.length < 11) {
                alert("Phone Number Cannot be lesse than 11 digits")
                invalid = true
            }
            if (nidNumber.length < 9) {
                alert("NID Number Cannot be lesse than 8 digits")
                invalid = true
            }
            if (address.length == 0) {
                alert("Address cannot be empty")
                invalid = true
            }
            if (area.length == 0) {
                alert("Area cannot be empty")
                invalid = true
            }
            if (district == 'Choose') {
                alert("Choose a District")
                invalid = true
            }
            if (!invalid) {
                let dataOfUser = {
                    name: name,
                    phoneNumber: phoneNumber,
                    email: email,
                    nidNumber: nidNumber,
                    address: address,
                    area: area,
                    district: district,
                    donatedTo: [
                        {
                            address: "Sample Address",
                            item: {
                                gloves: 0,
                                gowns: 0,
                                masks: 0,
                                ventilators: 0
                            },
                            name: "Hospital Name"
                        }
                    ],
                }
                createAccount(email, password, accountType, dataOfUser)
            }
        } else {
            alert("Please check your password")
        }
    }
});




$("#signOutBtn").click(function (e) {
    e.preventDefault
    firebase.auth().signOut();
})



function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}


function createAccount(email, password, accountType, dataOfUser) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]




    }).then(function (error) {


        console.log(accountType);
        if (accountType == 'donor') {
            console.log(accountType);
            let donor_db_path = database.ref('users/donor')
            let donorList = database.ref('userList/donorList')

            donor_db_path.push(dataOfUser)
            let listData = {
                name: dataOfUser.name,
                email: dataOfUser.email
            }
            donorList.push(listData)

            sendEmailVerification()
        } else {
            if (accountType == 'recipient') {
                console.log(accountType);
                let recipient_db_path = database.ref('users/recipient')
                let recipientList = database.ref('userList/recipientList')

                recipient_db_path.push(dataOfUser)
                let listData = {
                    name: dataOfUser.name,
                    email: dataOfUser.email
                }
                recipientList.push(listData)

                sendEmailVerification()
            }
        }
        firebase.auth().signOut();
        location.reload



    })
}

function sendEmailVerification() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        alert("Check your email to verify")

        window.location.replace('../login.html')
        // Email sent.
    }).catch(function (error) {
        console.log(error);
        // An error happened.
    });


}


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("User is signed in.");
        // User is signed in.
    } else {
        console.log("None Found.");
        // No user is signed in.
    }
});

