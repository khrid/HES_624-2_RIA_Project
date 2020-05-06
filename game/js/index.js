
currentlocation = 0;
currentjump = 150;
currentheightlocation = 0;

function augmenterjump() {
    currentjump += 10
}

async function sauter() {
    console.log("currentjump", currentjump)
    currentjump += 10
    var perso = window.document.getElementById("perso");
    perso.style.bottom = currentjump + "px"
    setTimeout(() => {
        if(currentjump <= 500) {
            sauter()
        }
    }, 10)
}

async function avancer() {
    var perso = window.document.getElementById("perso");
    var gameplan = window.document.getElementById("playground");
    currentlocation += 10
    gameplan.style.left = "-" + currentlocation + "px"
    perso.style.left = currentlocation + "px"
}
async function reculer() {
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
            await sauter(10)
            break;
        case 39:
            await avancer()
            break;
        case 37:
            await reculer()
            break;
        default:
            break;
    }
}, false);


addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


