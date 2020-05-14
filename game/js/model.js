

class Player {
    constructor(name, points=0) {
        this.name = name;
        this.points = points;
        this.actions = new Actions();
    }
}

class Actions {
    constructor() {}
    moveRight(){}
    moveLeft(){}
    jump(){}
    entrerClasse() {}

}

class Level {
    constructor(obstacles, level_id) {
        this.obstacles = obstacles;
        this.level_id = level_id;
    }
}

class Obstacle {
    constructor(location, type, taille=60) {
        this.location = location;
        this.type = type;
        this.taille = taille;
    }
}

class Classe {
    constructor(num, win=0) {}
}