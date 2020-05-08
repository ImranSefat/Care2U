//checking if the user's email is verified or not 
let database = firebase.database()
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        $("#loginBtn").css("display", "none");
        $("#signUpBtn").css("display", "none");
        let verified = firebase.auth().currentUser.emailVerified

        if (verified) {
            const recipient = checkingIfRecipient(user.email)
            console.log(recipient);

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

function checkingIfRecipient(email) {

    let recipientList = database.ref('userList/recipientList')

    recipientList.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {

            var childData = childSnapshot.val();
            if (email == childData.email) {
                return true
            } else return false
            // console.log(childData.email);

        });
    });





}



$("#signOutBtn").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    location.reload
});

