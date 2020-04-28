
currentlocation = 0;
currentheightlocation = 0;


function sauter() {
    var perso = document.getElementById("perso");
    perso.classList.add("jump");
    setTimeout(() => { perso.classList.remove("jump"); }, 1000)
}

function avancer() {
    var perso = window.document.getElementById("perso");
    var gameplan = window.document.getElementById("playground");
    currentlocation += 10
    gameplan.style.left = "-" + currentlocation + "px"
    perso.style.left = currentlocation + "px"
}
function reculer() {
    var perso = window.document.getElementById("perso");
    var gameplan = window.document.getElementById("playground");
    currentlocation -= 10
    gameplan.style.left = "-" + currentlocation + "px"
    perso.style.left = currentlocation + "px"
}

var keysDown = {};

addEventListener("keydown", function (e) {

    switch (e.keyCode) {
        case 32:
            sauter()
            break;
        case 39:
            avancer()
            break;
        case 37:
            reculer()
            break;
        default:
            break;
    }
}, false);


addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


