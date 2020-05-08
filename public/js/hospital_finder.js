//initializing database
let database = firebase.database()
let rootRef = database.ref('users/recipient')

let namesList = []
let addressList = []
let area = []
let district = []
let gloves = []
let gowns = []
let masks = []
let ventilators = []
$('.listing_row').remove();
// $(document).ready(function () {
//     // $("#testing1").children("#listing_row").remove()
//     // $("#testRe").click(function (e) {
//     //     e.preventDefault();
//     //     alert("asd")
//     //     $("#listing_row").remove();
//     // });
// });


rootRef.on('value', snapshot => {
    let hospitals = snapshot.val()

    let keys = Object.keys(hospitals)

    keys.forEach(element => {
        // getting all the data 
        // console.log(hospitals);
        namesList.push(hospitals[element].name)
        addressList.push(hospitals[element].address)

        area.push(hospitals[element].area)
        district.push(hospitals[element].district)

        gloves.push(hospitals[element].itemsAvailable.gloves)
        gowns.push(hospitals[element].itemsAvailable.gowns)
        masks.push(hospitals[element].itemsAvailable.masks)
        ventilators.push(hospitals[element].itemsAvailable.ventilators)




    });

    for (let index = 0; index < namesList.length; index++) {
        console.log("Name: ", namesList[index],
            "address: ", addressList[index],
        );

    }
    // namesList.forEach(element => {
    //     console.log(element);
    // });
    // addressList.forEach(element => {
    //     console.log(element);
    // });
    // district.forEach(element => {
    //     console.log(element);
    // });
    // gloves.forEach(element => {
    //     console.log(element);
    // });
    // gowns.forEach(element => {
    //     console.log(element);
    // });
    // masks.forEach(element => {
    //     console.log(element);
    // });
    // ventilators.forEach(element => {
    //     console.log(element);
    // });





})

// wait(2000)
// console.log(namesList);

function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}




// names.forEach(element => {
//     let _newRow = '<tr><td class="text-center">Better Life Hospital Ltd.</td><td class="text-center">Rampura</td><td class="text-center">Dhaka</td><td class="text-center">240</td><td class="text-center">18</td><td class="text-center">350</td><td class="text-center">27</td><td class="text-center"><button class="btn btn-success">Donate Now</button> </td></tr>'
// });
// let _newRow = '<tr><td class="text-center">Better Life Hospital Ltd.</td><td class="text-center">Rampura</td><td class="text-center">Dhaka</td><td class="text-center">240</td><td class="text-center">18</td><td class="text-center">350</td><td class="text-center">27</td><td class="text-center"><button class="btn btn-success">Donate Now</button> </td></tr>'

// let row = '<tr><td>'+customName+'</td></tr>'
// $(".listing_starts").append(_row);








//Checking the auth state and if there's no user then status button and signOut button will no longer be visible

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
