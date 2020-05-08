$("#status").css("display", "none");
$("#loginBtn").css("display", "none");
$("#signUpBtn").css("display", "none");
$("#signOutBtn").css("display", "none");


//checking if the user's email is verified or not 
let database = firebase.database()
let verified = false
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $("#signOutBtn").css("display", "block");
        verified = firebase.auth().currentUser.emailVerified

        if (verified) {
            console.log(user.email, " is logged In");
        } else {
            alert("Verify Your Email Address to go to your dashboard")
            window.location.replace('../index.html')
        }
    } else {
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


        });
    });





}



$("#signOutBtn").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    location.reload
});

