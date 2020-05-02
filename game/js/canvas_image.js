import DEPART_PLAYER from 'constants'
console.log(DEPART_PLAYER)

var canvas = document.getElementById('canvas'),
    game_container = document.getElementById('game_container');

var ctx = canvas.getContext('2d');
// ctx.canvas.width = playground.offsetWidth;
ctx.canvas.width = 10000;
ctx.canvas.height = game_container.offsetHeight;
let img = new Image();
img.src = 'images/bitmoji/albain_run.png';



const keyboard = (() => {
    document.addEventListener("keydown", keyHandler);
    document.addEventListener("keyup", keyHandler);
    const keyboard = {
        right: false,
        left: false,
        up: false,
        any: false,
    };
    function keyHandler(e) {
        const state = e.type === "keydown"
        if (e.keyCode == 39) {
            keyboard.right = state;
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
const player = {
    x: 0,
    y: 0,
    dx: 0, // delta x and y
    dy: 0,
    size: 400,
    onGround: false,
    jumpPower: -20,  // power of jump smaller jumps higher eg -10 smaller than -5
    moveSpeed: 15,
    update() {
        // react to keyboard state
        if (keyboard.up && this.onGround) { this.dy = this.jumpPower }
        if (keyboard.left) { this.dx = -this.moveSpeed }
        if (keyboard.right) { this.dx = this.moveSpeed }

        if (!(this.x <= DEPART_PLAYER)) {
            console.log("this.x + this.size < 0", this.x)
            this.x += this.dx;
        } else {
            this.x = DEPART_PLAYER+1;
        }
        this.dy += world.gravity;
        this.dy *= world.drag;
        this.dx *= this.onGround ? world.groundDrag : world.drag;
        this.y += this.dy;
        // test ground contact and left and right limits
        if (this.y + this.size >= world.ground) {
            this.y = world.ground - this.size;
            this.dy = 0;
            this.onGround = true;
        } else {
            this.onGround = false;
        }
        if (this.x > ctx.canvas.width) {
            this.x -= ctx.canvas.width;
        } else if (this.x + this.size < 0) {
            this.x += ctx.canvas.width;
        }
    },
    draw() {
        drawPlayer(this.x, this.y, this.size, this.size);
    },
    start() {
        this.x = DEPART_PLAYER;
        this.y = world.ground;
        this.onGround = true;
        this.dx = 0;
        this.dy = 0;
    }
}
const world = {
    gravity: 1, // strength per frame of gravity
    drag: 0.999, // play with this value to change drag
    groundDrag: 0.9, // play with this value to change ground movement
    ground: 900,
}

function drawPlayer(x, y, width, height) {
    ctx.drawImage(img, x, y, height, width);
}

function drawRect(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
function drawObstables() {}
function drawDoors() {}

function drayGame() {
    drawRect(0, 0, ctx.canvas.width, window.screen.height, "#afafaf");
    drawRect(0, window.screen.height-500, ctx.canvas.width, 500, "#e5d599");
    drawObstables();
    drawDoors();
}

function mainLoop(time) { // time passed by requestAnimationFrame        
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drayGame();
    player.update();
    player.draw();
    requestAnimationFrame(mainLoop);
}


player.start();
requestAnimationFrame(mainLoop);
window.focus();