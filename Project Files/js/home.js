
// $("#status").click(function (e) {
//     e.preventDefault();
//     let user = firebase.auth().currentUser
//     console.log(user.email);

// });


$("#signOutBtn").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    location.reload
});





firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email, "is signed in.");
        $("#loginBtn").css("display", "none");
        $("#signUpBtn").css("display", "none");
        $("#status").prop('disabled', true);

    } else {
        console.log("None Found.");
        $("#signOutBtn").css("display", "none");
        $("#status").off('click');
        // $("#anchorid").off('click');

    }
});
