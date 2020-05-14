function getRoomWin(){
    var level_data = null;
    var number = null;
    if (level_data == null) {
        console.log("No data loaded yet for this level.")
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                level_data = JSON.parse(this.responseText);
                time_level = level_data.time_of_level;
                level_data.floors.forEach(function (floor) {
                    floor.classes.forEach(function (classe) {
                        if(classe.win) {
                            number = classe.number;
                        }  
                    });
                });
            } else if (this.status == 404) {
                console.log("Could not find level data.")
            }
        };
        xhttp.open("GET", "db/level_"+window.localStorage.getItem('level')+".json", false);
        xhttp.send();
    }
    return number;
}


function getTimeLevel(){

    var level_data = null;
    var time = null;
    if (level_data == null) {
        console.log("No data loaded yet for this level.")
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                level_data = JSON.parse(this.responseText);
                time_level = level_data.time_of_level;
                time = level_data.time_of_level;
                console.log(time);
            } else if (this.status == 404) {
                console.log("Could not find level data.")
            }
        };
        xhttp.open("GET", "db/level_"+window.localStorage.getItem('level')+".json", false);
        xhttp.send();
    }

    return time;
}
