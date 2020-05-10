



function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}


$('#resetPassBtn').click(function (e) {
    e.preventDefault();
    let email = $('#email').val()

    let validatedEmail = validateEmail(email)

    if (validatedEmail) {
        var auth = firebase.auth();


        auth.sendPasswordResetEmail(email).then(function () {
            alert('Please Check your email to reset your password')
        }).catch(function (error) {
            // An error happened.
        });
    }



});








