document.addEventListener('DOMContentLoaded', function(){
    if(window.getComputedStyle(document.querySelector('li.hamburger')).display !== "none") {
        var elems = document.querySelectorAll('body > header > nav > ul > li:not([class="hamburger"])');
        var index = 0, length = elems.length;
        for ( ; index < length; index++) {
            elems[index].style.visibility = "hidden";
        }
        document.querySelector('body > header > nav > ul').style.height = "50px";
    }
}, false);

function displayMenu() {
    var estDeroule = true;
    if(document.querySelector('body > header > nav > ul > li:not([class="hamburger"])').style.visibility === "hidden") {
        estDeroule = false;
    } else {
        estDeroule = true;
    }


    var elems = document.querySelectorAll('body > header > nav > ul > li:not([class="hamburger"])');
    var index = 0, length = elems.length;
    if(!estDeroule) {
        document.querySelector('body > header > nav > ul').style.height = "auto";
        for ( ; index < length; index++) {
            elems[index].style.visibility = "visible";
        }
    } else {
        document.querySelector('body > header > nav > ul').style.height = "50px";
        for ( ; index < length; index++) {
            elems[index].style.visibility = "hidden";
        }
    }
}

