$("#status").css("display", "none");
$("#loginBtn").css("display", "none");
$("#signUpBtn").css("display", "none");
$("#signOutBtn").css("display", "none");
$("#signOutBtn").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    // window.location.replace('./index.html')
    location.reload()
});

// status button check if it's a recipient or not 
// if a user is registered as a recipient then the status button will display
//initializing database
let database = firebase.database()
let rootRef = database.ref('userList/recipientList')
let allHospitalEmails = []

rootRef.on('value', snapshot => {
    allHospitalEmails = []
    let data = snapshot.val()
    let keys = Object.keys(snapshot.val())

    keys.forEach(element => {
        allHospitalEmails.push(data[element].email)
        // console.log(allHospitalEmails);
    });
    let user = firebase.auth().currentUser
    let currentUserEmail = user.email
    let userIsRecipient = allHospitalEmails.includes(currentUserEmail)
    console.log(userIsRecipient);
    $("#status").css("display", "block");
})



firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email, "is signed in.");
        $("#signOutBtn").css("display", "block");
        $("#status").css("display", "block");

    } else {
        console.log("None Found.");
        $("#loginBtn").css("display", "block");
        $("#signUpBtn").css("display", "block");
        $("#signOutBtn").css("display", "none");


    }
});
