
// $("#status").click(function (e) {
//     e.preventDefault();
//     let user = firebase.auth().currentUser
//     console.log(user.email);

// });


$("#signOutBtn").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    // window.location.replace('./index.html')
    location.reload()
});





firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email, "is signed in.");
        $("#loginBtn").css("display", "none");
        $("#signUpBtn").css("display", "none");


    } else {
        console.log("None Found.");
        $("#status").css("display", "none");
        $("#signOutBtn").css("display", "none");


    }
});
