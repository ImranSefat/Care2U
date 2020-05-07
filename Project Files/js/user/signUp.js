//checking if a user is signed in



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
                createAccount(email, password)
                //sendEmailVerification()
            }


        } else {
            alert("Please check your password")
        }
    }


});



// receipent sign up 



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

    //console.log(name, phoneNumber, email, password, rePassword, nidNumber, address, area, district);

    // email address validation 
    let valid = validateEmail(email)
    // console.log(valid);

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
                createAccount(email, password)

            }


        } else {
            alert("Please check your password")
        }
    }


});


// donor sign up


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


function createAccount(email, password) {
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
        sendEmailVerification()


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

