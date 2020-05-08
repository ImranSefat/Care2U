$("#loginBtn").click(function (e) {
    e.preventDefault();
    let email = $("#email").val()
    let pass = $("#password").val()


    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
        alert(errorMessage)

    });

});



$("#forgotPassBtn").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    location.reload
});




firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email, "is signed in.");
        let verified = firebase.auth().currentUser.emailVerified
        //console.log(verified);
        if (verified) {
            window.location.replace('../dashboard.html')
        } else {
            alert("Verify Your Email Address to go to your dashboard")
            firebase.auth().signOut();
            window.location.replace('../login.html')
        }
    } else {
        console.log("None Found.");
        // No user is signed in.
    }
});

