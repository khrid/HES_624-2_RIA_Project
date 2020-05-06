
var canvas = document.getElementById('canvas'),
    game_container = document.getElementById('game_container'),
    ctx = canvas.getContext('2d');
// CONSTANTS
const DEPART_PLAYER = 0;
const GAME_HEIGHT = game_container.offsetHeight;
const GAME_WIDTH = window.screen.width;
const GAME_PLAY = {
    gravity: 0.2, // strength per frame of gravity
    drag: 0.999, // play with this value to change drag
    groundDrag: 0.9, // play with this value to change ground movement
    ground: GAME_HEIGHT-300,
}

// ctx.canvas.width = 10000;
ctx.canvas.height = GAME_HEIGHT;
ctx.canvas.width = GAME_WIDTH;
const image_player = new Image();


class Player {
    constructor(img, width, height, x=DEPART_PLAYER, y=GAME_PLAY.ground, dx=0, dy=0, onGround=true, onRun=false, jumpPower=-20, moveSpeed=15) {
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
    }

    update() {
        // Modification lorsque le clavier est 
        if (keyboard.up && this.onGround) { this.dy = this.jumpPower }
        if (keyboard.left) { this.dx = -this.moveSpeed; this.onRun=true }
        if (keyboard.right) { this.dx = this.moveSpeed; this.onRun=true }
        if (keyboard.drink) { this.drink = true; }

        this.dy += GAME_PLAY.gravity;
        this.dy *= GAME_PLAY.drag;
        this.dx *= this.onGround ? GAME_PLAY.groundDrag : GAME_PLAY.drag;
        this.y += this.dy;
        this.x += this.dx;

        // Test du contact avec le sol
        if (this.y + this.height >= GAME_PLAY.ground) {
            this.y = GAME_PLAY.ground - this.height;
            this.dy = 0;
            this.onGround = true;
        } else {
            this.onGround = false;
        }

        // Test du contact avec les bordures du canvas
        if (this.x > ctx.canvas.width-this.width) {
            this.x = ctx.canvas.width - this.width;
        } else if (this.x <= DEPART_PLAYER) {
            this.x = DEPART_PLAYER;
        }


    }

    draw() {
        if(this.onGround) {
            this.img.src = 'images/bitmoji/lou_run.png';
        } else  {
            this.img.src = 'images/bitmoji/lou_run_2.png';
        }

        game.drawImg(this.img, this.x, this.y, this.height, this.width);
        this.onRun=false
    }
}
const escalier = new Image();
escalier.src = 'images/escalier.png'

class Game {

    drawImg(img, x, y, width, height) {
        ctx.drawImage(img, x, y, height, width);
    }

    drawRect(x, y, width, height, color) {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    drawEscalier() {
        // this.drawImg(escalier, GAME_WIDTH-500, GAME_HEIGHT-500, 500, 500)
    }
    drawObstables() {}

    drawDoors() {}

    drayGame() {
        this.drawRect(0, 0, ctx.canvas.width, GAME_HEIGHT, "#afafaf");
        this.drawRect(0, GAME_HEIGHT-350, ctx.canvas.width, 500, "#e5d599");
        this.drawEscalier();
        this.drawObstables();
        this.drawDoors();
    }
}


// Loop pour dessiner le jeu (boucle infinie)
function mainLoop(time) {       
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.drayGame();
    player.update();
    player.draw();
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
        if (state) { keyboard.any = true } // must reset when used
    }
    return keyboard;
})();



const player = new Player(image_player, 236, 336);
const game = new Game();

requestAnimationFrame(mainLoop);
window.focus();