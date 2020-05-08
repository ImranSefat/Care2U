
//checking if the user's email is verified or not 
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email, "is signed in.");
        $("#loginBtn").css("display", "none");
        $("#signUpBtn").css("display", "none");
        let verified = firebase.auth().currentUser.emailVerified
        //console.log(verified);
        if (verified) {
            //window.location.replace('../dashboard.html')
        } else {
            alert("Verify Your Email Address to go to your dashboard")
            window.location.replace('../index.html')
        }
    } else {
        $("#signOutBtn").css("display", "none");
        alert("Sign In to see this page!")
        window.location.replace('../index.html')
    }
});



$("#signOutBtn").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    location.reload
});

