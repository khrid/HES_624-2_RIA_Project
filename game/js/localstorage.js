function setUser(username){
    window.localStorage.setItem('name', username); 
}

function getImagePath(){
    name= window.localStorage.getItem('name');
    imageWin = document.getElementById('imgwin');
    imageWin.setAttribute("src", "images/bitmoji/"+name+"_win.png");

}

console.log("localstorage.js included");

function loadHofInLocalStorage(location) {
    let url;
    switch (location) {
        case "site":
            url = "game/";
            break;
        case "game":
            url = "";
            break;
    }
    // chargement du fichier des scores (hof.db)
    let db;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            db = JSON.parse(this.responseText);
            console.log("Base de données des scores chargée. Creating local storage copy");
            window.localStorage.setItem("runhessorun-db-hof", JSON.stringify(db));

        } else if(this.status == 404) {
            console.log("Base de données des scores introuvable.")
        }
    };
    xhttp.open("GET", url+"db/hof.json", false); // FALSE POUR ATTENDRE LA RÉPONSE
    xhttp.send();
}
