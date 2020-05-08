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



$("#signOutBtn").click(function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    location.reload
});


let rootRef = database.ref('users/recipient')
//items in the available section
let availableGloves = []
let availableGowns = []
let availableMasks = []
let availableVentilators = []


let requiredGloves = []
let requiredGowns = []
let requiredMasks = []
let requiredVentilators = []




rootRef.on('value', snapshot => {

    availableGloves = []
    availableGowns = []
    availableMasks = []
    availableVentilators = []

    requiredGloves = []
    requiredGowns = []
    requiredMasks = []
    requiredVentilators = []

    let hospitals = snapshot.val()

    let keys = Object.keys(hospitals)

    keys.forEach(element => {
        // getting the inventory data items value

        requiredGloves.push(hospitals[element].itemsRequested.gloves)
        requiredGowns.push(hospitals[element].itemRequested.gowns)
        requiredMasks.push(hospitals[element].itemRequested.masks)
        requiredVentilators.push(hospitals[element].itemRequested.ventilators)

        availableGloves.push(hospitals[element].itemsAvailable.gloves)
        availableGowns.push(hospitals[element].itemsAvailable.gowns)
        availableMasks.push(hospitals[element].itemsAvailable.masks)
        availableVentilators.push(hospitals[element].itemsAvailable.ventilators)



    });

})