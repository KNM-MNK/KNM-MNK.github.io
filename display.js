// Necessary Variables
var shift = 0;
var foodSelectID = "";
var foodSelect = "";
var doseSelect = "";
var previousID = "food0";
var toggle = -1;
var userList = [];
for(var i = 0; i < 5; i++){
    userList.push("User " + (i+1));
}
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
console.log(pageWidth + " " + pageHeight);
//Personal Computer: 2560px width, 1289px height

/*  CLEAR FUNCTION
document.body.addEventListener("keypress", clearTest);
function clearTest(e){
    if(e.keyCode == 32){
        localStorage.clear();
        location.reload();
    }
}
*/

// Page Styling
document.body.style.backgroundColor = "lightgrey";
var logo = document.createElement("img");
logo.src = "images/AG-Logo.png";
logo.style.top = "0px";
logo.style.left = "0px";
logo.style.position = "absolute";
logo.style.cssFloat = "left";
logo.style.padding = "25px";
logo.style.width = "300px";
logo.style.height = "150px";
document.body.append(logo);
var version = document.createElement("rect");
version.style.backgroundColor = "transparent";
version.style.top = "125px";
version.style.left = "225px";
version.style.position = "absolute";
version.style.cssFloat = "left";
version.style.width = "50px";
version.style.height = "25px";
version.style.color = "grey";
version.style.fontSize = "10px";
version.innerHTML = "version 1.0.4";
document.body.append(version);

// User Information
var user = document.createElement("rect");
user.style.top = "205px";
user.style.left = "123px";
user.style.position = "absolute";
user.style.backgroundColor = "white";
user.style.border = "thin black solid";
user.style.width = "125px";
user.style.height = "40px";
user.style.textAlign = "center";
user.innerHTML = "Selected User: " + localStorage.getItem("user");
if(localStorage.getItem("user") === null){
    user.innerHTML = "Selected User: User 1";
}
user.addEventListener("click", function userToggle(){
    toggle = toggle * -1;
    if(toggle == -1){
        for(var i = 0; i < 5; i++){
            document.getElementById("person " + i).remove();
        }
    }
    if(toggle == 1){
        for(var i = 0; i < 5; i++){
            var select = document.createElement("rect");
            select.style.top = (i*40) + 245 + "px";
            select.style.left = user.style.left;
            select.style.position = "absolute";
            select.style.backgroundColor = "white";
            select.style.border = "thin black solid";
            select.style.width = "125px";
            select.style.height = "40px";
            select.style.textAlign = "center";
            select.innerHTML =  userList[i];
            select.id = "person " + i;
            select.addEventListener("click", function userChange(e){
                var name = e.target.id;
                localStorage.setItem("user", document.getElementById(name).innerHTML);
                for(var i = 0; i < 5; i++){
                    localStorage.setItem("userList " + i, userList[i]);
                }
                location.reload();
            });
            document.body.append(select);
        }
    }
});
document.body.append(user);

// Date Information
const currentDate = new Date();
var theDay = currentDate.getDate();
var theYear = currentDate.getFullYear();
var theMonth = monthFilter(currentDate.getMonth());
calendar();
function monthFilter(m){
    if(m == 0){
        shift = shiftFilter((theYear%7));
        console.log(shift);
        return "January";
    }
    if(m == 1){
        shift = shiftFilter((theYear%7-4));
        console.log(shift);
        return "February";
    }
    if(m == 2){
        shift = shiftFilter((theYear%7-4));
        console.log(shift);
        return "March";
    }
    if(m == 3){
        shift = shiftFilter((theYear%7-1));
        console.log(shift);
        return "April";
    }
    if(m == 4){
        shift = shiftFilter((theYear%7+1));
        console.log(shift);
        return "May";
    }
    if(m == 5){
        shift = shiftFilter((theYear%7-3));
        console.log(shift);
        return "June";
    }
    if(m == 6){
        shift = shiftFilter((theYear%7-1));
        console.log(shift);
        return "July";
    }
    if(m == 7){
        shift = shiftFilter((theYear%7-5));
        console.log(shift);
        return "August";
    }
    if(m == 8){
        shift = shiftFilter((theYear%7-2));
        console.log(shift);
        return "September";
    }
    if(m == 9){
        shift = shiftFilter((theYear%7));
        console.log(shift);
        return "October";
    }
    if(m == 10){
        shift = shiftFilter((theYear%7-4));
        console.log(shift);
        return "November";
    }
    if(m == 11){
        shift = shiftFilter((theYear%7-2));
        console.log(shift);
        return "December";
    }
}
function shiftFilter(s){
    if(s >= 7){
        s = s%7;
    }
    return s;
}

// Creating Calendar Element
function calendar(){
    var headline = document.createElement("rect");
    headline.style.position = "absolute";
    headline.style.cssFloat = "left";
    headline.style.top = "175px";
    headline.style.left = "250px";
    headline.style.backgroundColor = "white";
    headline.style.border = "thin darkgrey solid";
    headline.style.width = (pageWidth*0.7) + "px";
    headline.style.height = "75px";
    headline.style.textAlign = "center";
    headline.style.fontFamily = "calibri";
    headline.style.fontSize = "50px";
    headline.style.textAlign = "center";
    headline.style.cssFloat = "left";
    headline.innerHTML = theMonth + " " + theYear;
    document.body.append(headline);
    var count = 0;
    for(var y = 0; y < 5; y++){
        for(var x = 0; x < 7; x++){
            var box = document.createElement("rect");
            box.style.position = "absolute";
            box.style.cssFloat = "left";
            box.style.top = (y*(pageWidth*0.1)+250) + "px";
            box.style.left = (x*(pageWidth*0.1)+250) + "px";
            box.style.backgroundColor = "white";
            box.style.border = "thin darkgrey solid";
            box.style.width = (pageWidth*0.1) + "px";
            box.style.height = (pageWidth*0.1) + "px";
            box.style.textAlign = "left";
            box.style.fontFamily = "calibri";
            box.style.fontSize = "20px";
            box.style.cssFloat = "left";
            box.innerHTML = "\n";
            box.id = count;
            box.addEventListener("click", editShow);
            document.body.append(box);
            count++
        }
    }
    var temp = 1;
    for(var i = shift; i < 31+shift; i++){
        var select = document.getElementById(i);
        if(temp == theDay){
            document.getElementById(i).style.backgroundColor = "lightyellow";
        }
        select.id = localStorage.getItem("user") + ", " + theMonth + " " + i;
        if(localStorage.getItem(select.id) === null){
            select.innerHTML = temp + ":\n";
        } else{
            select.innerHTML = temp + ":\n" + localStorage.getItem(select.id);
        }
        temp++;
    }
}

// Selection Edit PopUp
var editBackground = document.createElement("rect");
editBackground.style.top = "175px";
editBackground.style.left = "250px";
editBackground.style.position = "absolute";
editBackground.style.backgroundColor = "white";
editBackground.style.border = "thin black solid";
editBackground.style.width = (pageWidth*0.7) + "px";
editBackground.style.height = (pageWidth*0.56) + "px";
editBackground.style.display = "none";
editBackground.style.fontSize = "50px";
editBackground.innerHTML = "";
document.body.append(editBackground);
var exitEdit = document.createElement("button");
exitEdit.style.top = "175px";
exitEdit.style.left = (pageWidth*0.75) + "px";
exitEdit.style.position = "absolute";
exitEdit.style.backgroundColor = "red";
exitEdit.style.border = "black solid";
exitEdit.style.width = "50px";
exitEdit.style.height = "50px";
exitEdit.style.display = "none";
exitEdit.innerHTML = "X";
exitEdit.addEventListener("click", editHide);
document.body.append(exitEdit);
var clearEdit = document.createElement("button");
clearEdit.style.top = "175px";
clearEdit.style.left = "750px";
clearEdit.style.position = "absolute";
clearEdit.style.backgroundColor = "ivory";
clearEdit.style.border = "thin black solid";
clearEdit.style.width = (pageWidth*0.075) + "px";
clearEdit.style.height = "25px";
clearEdit.style.display = "none";
clearEdit.innerHTML = "Clear Entry";
clearEdit.addEventListener("click", editClear);
document.body.append(clearEdit);
btn(0, "images/EggBTN.png");
btn(1, "images/MilkBTN.png");
btn(2, "images/SoyBTN.png");
btn(3, "images/WheatBTN.png");
btn(4, "images/FishBTN.png");
btn(5, "images/ShellfishBTN.png");
btn(6, "images/PeanutBTN.png");
btn(7, "images/TreenutBTN.png");
function btn(x, source){
    var foodButton = document.createElement("img");
    foodButton.src = source;
    foodButton.style.top = (pageWidth*0.1) + "px";
    foodButton.style.left = (x*(pageWidth*0.075)+275) + "px";
    foodButton.style.width = (pageWidth*0.075) + "px";
    foodButton.style.height = (pageWidth*0.1) + "px";
    foodButton.style.position = "absolute";
    foodButton.style.border = "thin black solid";
    foodButton.id = "food" + x;
    foodButton.addEventListener("click", updateFood);
    foodButton.style.display = "none";
    document.body.append(foodButton);
}
var reaction = document.createElement("input");
reaction.style.top = (pageWidth*0.25) + "px";
reaction.style.left = "280px";
reaction.style.position = "absolute";
reaction.style.width = "500px";
reaction.style.height = "30px";
reaction.style.backgroundColor = "transparent";
reaction.style.border = "thin transparent solid";
reaction.style.borderBottomColor = "darkblue";
reaction.placeholder = "Enter reaction description.";
reaction.style.display = "none";
document.body.append(reaction);

// Day Selection Information
var modify = "";
var binary = 0;
function editHide(){
    editBackground.style.display = "none";
    exitEdit.style.display = "none";
    clearEdit.style.display = "none";
    reaction.style.display = "none";
    for(var i = 0; i < 8; i++){
        document.getElementById("food" + i).style.display = "none";
    }
    if(foodSelect == ""){
        return;
    } else{
        if (binary == 0){
            localStorage.setItem(modify, foodSelect + ", " + doseSelect + ":\n" + reaction.value);
        } else{
            localStorage.setItem(modify, "");
        }
    }
    binary = 0;
    document.getElementById(previousID).style.opacity = "1";
    reaction.style.value = "";
    foodSelectID = "";
    foodSelect = "";
    doseSelect = "";
    location.reload();
}
function editShow(e){
    modify = e.target.id;
    editBackground.style.display = "initial";
    exitEdit.style.display = "initial";
    clearEdit.style.display = "initial";
    reaction.style.display = "initial";
    for(var i = 0; i < 8; i++){
        document.getElementById("food" + i).style.display = "initial";
    }
    var temp = document.getElementById(modify).innerHTML.substring(0, 3);
    if(temp.substring(1, 2) == ":"){
        temp = temp.substring(0, 1);
    }
    if(temp.substring(2, 3) == ":"){
        temp = temp.substring(0, 2);
    }
    editBackground.innerHTML = theMonth + " " + temp + ", " + theYear;
}

function editClear(){
    binary = 1;
    foodSelect = "cancel";
    editHide();
}
function updateFood(e){
    foodSelectID = e.target.id;
    if(foodSelectID === null){
        return;
    }
    if(foodSelectID == "food0"){
        document.getElementById(previousID).style.opacity = "1";
        previousID = foodSelectID;
        document.getElementById(foodSelectID).style.opacity = "0.5";
        foodSelect = "Egg";
        doseSelect = "mg";
    }
    if(foodSelectID == "food1"){
        document.getElementById(previousID).style.opacity = "1";
        previousID = foodSelectID;
        document.getElementById(foodSelectID).style.opacity = "0.5";
        foodSelect = "Milk";
        doseSelect = "mL";
    }
    if(foodSelectID == "food2"){
        document.getElementById(previousID).style.opacity = "1";
        previousID = foodSelectID;
        document.getElementById(foodSelectID).style.opacity = "0.5";
        foodSelect = "Soy";
        doseSelect = "mL";
    }
    if(foodSelectID == "food3"){
        document.getElementById(previousID).style.opacity = "1";
        previousID = foodSelectID;
        document.getElementById(foodSelectID).style.opacity = "0.5";
        foodSelect = "Wheat";
        doseSelect = "mg";
    }
    if(foodSelectID == "food4"){
        document.getElementById(previousID).style.opacity = "1";
        previousID = foodSelectID;
        document.getElementById(foodSelectID).style.opacity = "0.5";
        foodSelect = "Fish";
        doseSelect = "mg";
    }
    if(foodSelectID == "food5"){
        document.getElementById(previousID).style.opacity = "1";
        previousID = foodSelectID;
        document.getElementById(foodSelectID).style.opacity = "0.5";
        foodSelect = "Shellfish";
        doseSelect = "mg";
    }
    if(foodSelectID == "food6"){
        document.getElementById(previousID).style.opacity = "1";
        previousID = foodSelectID;
        document.getElementById(foodSelectID).style.opacity = "0.5";
        foodSelect = "Peanut";
        doseSelect = "mg";
    }
    if(foodSelectID == "food7"){
        document.getElementById(previousID).style.opacity = "1";
        previousID = foodSelectID;
        document.getElementById(foodSelectID).style.opacity = "0.5";
        foodSelect = "Treenut";
        doseSelect = "mg";
    }
}
