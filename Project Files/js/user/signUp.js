$("#signUpBtnRecp").click(function (e) {
    e.preventDefault();
    let name = $("#inputNameRcpt").val()
    let phoneNumber = $("#inputPhoneNumberRcpt").val()
    let email = $("#inputEmailRcpt").val()
    let password = $("#inputPasswordRcpt").val()
    let rePassword = ("#inputPasswordConfirmRcpt").val()
    let regNo = $("#inputRegNumberRcpt").val()
    let address = $("#inputAddressRcpt").val()
    let area = $("#inputAreaRcpt").val()
    let district = $("#districtRcpt option:selected").text();
    console.log(name, phoneNumber, email, password, rePassword, regNo, address, area, district);




});



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
    });
}


