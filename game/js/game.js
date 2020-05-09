var canvas = document.getElementById('canvas'),
    game_container = document.getElementById('game_container'),
    ctx = canvas.getContext('2d'),
    level_data = null, // data from json, stored for processing
    level_data_processed = new Array(3),
    level_obstacles = null,
    level_classes = null;
// CONSTANTS
const DEPART_PLAYER = 0;
const GAME_HEIGHT = game_container.offsetHeight;
const GAME_WIDTH = window.screen.width;
const GAME_PLAY = {
    gravity: 0.8, // strength per frame of gravity
    drag: 0.999, // play with this value to change drag
    groundDrag: 0.9, // play with this value to change ground movement
    ground: GAME_HEIGHT - 300,
};
var currentFloor = 1;

ctx.canvas.width = 12000;
ctx.canvas.height = GAME_HEIGHT;
//ctx.canvas.width = GAME_WIDTH;
const image_player = new Image();

var screen_left = 0, screen_right = window.innerWidth;
console.log(screen_left);
console.log(screen_right);


class Player {
    constructor(img, width, height, x = DEPART_PLAYER, y = GAME_PLAY.ground, dx = 0, dy = 0, onGround = true, onRun = false, jumpPower = -20, moveSpeed = 15) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.width = width;
        this.height = height;
        this.onGround = onGround;
        this.onRun = onRun;
        this.jumpPower = jumpPower;
        this.moveSpeed = moveSpeed;
        this.drink = false;
        this.ground = GAME_PLAY.ground;
    }

    update() {
        // Modification lorsque le clavier est 
        if (keyboard.up && this.onGround) {
            this.dy = this.jumpPower
        }
        if (keyboard.left) {
            this.dx = -this.moveSpeed;
        }
        if (keyboard.right) {
            this.dx = this.moveSpeed;
            this.onRun = true;
        }
        if (keyboard.drink) {
            this.drink = true;
        }

        this.dy += GAME_PLAY.gravity;
        this.dy *= GAME_PLAY.drag;
        this.dx *= this.onGround ? GAME_PLAY.groundDrag : GAME_PLAY.drag;
        this.y += this.dy;
        this.x += this.dx;

        // Test du contact avec le sol
        if (this.y + this.height >= this.ground) {
            this.y = this.ground - this.height;
            this.dy = 0;
            this.onGround = true;
        } else {
            this.onGround = false;
        }
        // Test du contact avec les bordures du canvas
        if (this.x > ctx.canvas.width - this.width) {
            if(currentFloor < 3) {
                currentFloor++;
                this.x = DEPART_PLAYER;
                //ctx.translate(ctx.canvas.width,0);
            } else {
                this.x = ctx.canvas.width - this.width ;
            }
        } else if (this.x <= DEPART_PLAYER) {
            if(currentFloor > 1) {
                currentFloor--;
                this.x = ctx.canvas.width - this.width ;
                //ctx.translate(-ctx.canvas.width,0);
            } else {
                this.x = DEPART_PLAYER;
            }
        }


        // Test du contact avec les bordures du canvas
        if (this.x-this.width >= DEPART_PLAYER && this.x < ctx.canvas.width - this.width) {
            var currObsta = game.checkIfColision(this.x, this.width, currentFloor);
            //console.log((this.ground-this.y) > (GAME_PLAY.ground-150))

            if(currObsta != null) {

                if((this.y+this.height) <= (GAME_PLAY.ground-100)) {
                   this.ground = GAME_PLAY.ground-100;
                   ctx.translate(-this.dx, 0);
                } else {
                    this.ground = GAME_PLAY.ground;
                    if(this.x >= (currObsta.location-this.width) && this.x <= (currObsta.location-this.width+100)) {
                        this.x = currObsta.location-this.width;
                    } else {
                        this.x = currObsta.location+300;
                    }
                }
            } else {
                this.ground = GAME_PLAY.ground;
                ctx.translate(-this.dx, 0);
            }
        }
        
        
    }

    draw() {
        if (!this.onGround) {
            this.img.src = 'images/bitmoji/lou_run.png';
        } else {
            this.img.src = 'images/bitmoji/lou_walk.png';
        }
        game.drawImg(this.img, this.x, this.y, this.width, this.height, keyboard.left);
        
        this.onRun = false
    }
}

function drawImageTest(ctx, frame) {
    ctx.drawImage(frame.buffer, 0, 0)
}
const escalier = new Image();
escalier.src = 'images/escalier.png'

const table = new Image();
table.src = "images/table.png";

const porte = new Image();
porte.src = "images/porte.png";

class Game {


    drawImg(img, x, y, width, height) {
        ctx.drawImage(img, x, y, width, height);
    }

    drawRect(x, y, width, height, color) {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }


    drawEscalier() {
        // escalier à la fin de l'étage 1 et 2
        if(currentFloor < 3 ) {
            //game.drawImg(escalier , obstacle.location, GAME_HEIGHT-500, 500, 500);
        }

        // escalier au début de l'étage 2 et 3
        if(currentFloor > 1) {

        }
    }

    drawObstacles() {
        level_data_processed[currentFloor-1][1].forEach(function (obstacle) {
            game.drawImg(obstacle.img, obstacle.location, GAME_PLAY.ground-150, 300, 300);
        });
    }

    drawDoors() {
        var offset = 1000;
        var i = 1;
        ctx.save();
        level_data_processed[currentFloor-1][0].forEach(function (classe) {
            //game.drawImg(porte , offset*i, GAME_HEIGHT-700, 350, 175);
            ctx.fillStyle = "#afafaf";
            ctx.font  = '100px "BD Cartoon Shout"';
            var num = classe.num+"";
            ctx.textBaseline = 'middle';
            ctx.textAlign = "center";
            ctx.fillText(num.substr(0,1), (offset*i)+50, GAME_HEIGHT-620);
            ctx.fillText(num.substr(1,1), (offset*i)+50, GAME_HEIGHT-520);
            ctx.fillText(num.substr(2,1), (offset*i)+50, GAME_HEIGHT-420);
            i++;
        });
        ctx.restore();
    }

    drawGame() {
        this.drawRect(0, 0, ctx.canvas.width+window.innerWidth , GAME_HEIGHT, "#afafaf");
        this.drawRect(0, GAME_HEIGHT - 350, ctx.canvas.width+window.innerWidth, 500, "#e5d599");
        //this.drawLevel();
        this.drawDoors();
        this.drawEscalier();
        this.drawObstacles();
    }

    processLevelDb() {
        if (level_data == null) {
            console.log("No data loaded yet for this level.")
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    //console.log(this.responseText);
                    level_data = JSON.parse(this.responseText);
                    //console.log(db);
                    console.log("Level loaded.");
                    var i = 0;
                    console.log(level_data_processed);
                    level_data.floors.forEach(function (floor) {
                        console.log(floor);
                        level_data_processed[i] = new Array(2);
                        level_data_processed[i][0] = [];
                        level_data_processed[i][1] = [];
                        floor.classes.forEach(function (classe) {
                            //console.log(classe);
                            level_data_processed[i][0].push(new Classe(classe.number, 0));
                        });
                        floor.obstacles.forEach(function (obstacle) {
                            //console.log(classe);
                            level_data_processed[i][1].push(new Obstacle(obstacle.location, obstacle.type, obstacle.img_file));
                        });
                        i++
                    });
                    console.log(level_data_processed);


                } else if (this.status == 404) {
                    console.log("Could not find level data.")
                }
            };

            xhttp.open("GET", "db/level_one.json", false);
            xhttp.send();
        }
    }
    checkIfColision(x, width, currentFloor) {
        var obst = level_data.floors[currentFloor].obstacles
        for (let i = 0; i < obst.length; i++) {
            if(x >= (obst[i].location-width) && x <= (obst[i].location + 300)){
                return obst[i]
            }
        }
        return null
    }
}


// Loop pour dessiner le jeu (boucle infinie)
function mainLoop(time) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.drawGame();
    player.update();
    player.draw();
    game.drawObstacles();
    requestAnimationFrame(mainLoop);
}


// Création des évènements du keyboard
const keyboard = (() => {
    document.addEventListener("keydown", keyHandler);
    document.addEventListener("keyup", keyHandler);
    const keyboard = {
        right: false,
        left: false,
        up: false,
        any: false,
        drink: false
    };

    function keyHandler(e) {
        const state = e.type === "keydown"
        if (e.keyCode == 39) {
            keyboard.right = state;
        } else if (e.keyCode == 40) {
            keyboard.drink = state;
        } else if (e.keyCode == 37) {
            keyboard.left = state;
        } else if (e.keyCode == 38) {
            keyboard.up = state;
            e.preventDefault();
        }
        if (state) {
            keyboard.any = true
        } // must reset when used
    }

    return keyboard;
})();


class Obstacle {
    constructor(location, type, img_file, taille = 60) {
        this.location = location;
        this.type = type;
        this.taille = taille;
        this.img = new Image();
        this.img.src = "images/Obstacles/" + img_file; 
    }
}

class Classe {
    constructor(num, win = 0) {
        this.num = num;
        this.win = win;
    }
}


const player = new Player(image_player, 236, 336);
const game = new Game();
game.processLevelDb();
requestAnimationFrame(mainLoop);
window.focus();
