// initialize the Game variable
const modal = document.querySelector('.modal'),
    playAgain = document.getElementById('playAgain'),
    life = document.querySelector('.life'),
    dashScore = document.querySelector('.score'),
    modalScore = document.getElementById('score');

let score;

// Random function to calculate speed of the enemy
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/* Start Enemies =========================*/
// Enemy object that must our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = getRandomNumber(1, 10);
    this.width = 50;
    this.height = 85;
    // The image/soul for our enemies
    this.soul = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (this.x > 500) {
        this.x = -100;
    } else {
        this.x += 50 * this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.soul), this.x, this.y);
};

/*========================= Start Gems */
let gemTypes = [
    'images/gem-blue.png',
    'images/gem-green.png',
    'images/gem-orange.png'
]
function Gem () {
    this.x = getRandomNumber(50, 450);
    this.y = getRandomNumber(37, 300);
    this.width = 50;
    this.height = 85;
    this.type = gemTypes[Math.floor(Math.random() * gemTypes.length)]; // get random item from an array
    if (this.type == 'images/gem-blue.png'){
        this.score = 40;
    } else if (this.type == 'images/gem-green.png'){
        this.score = 30;
    } else if (this.type == 'images/gem-orange.png'){
        this.score = 20;
    } else {
        this.score = 20;
    }
}

Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.type), this.x, this.y);
}

Gem.prototype.update = function() {
    if (player.x < (gem.x + gem.width) && (player.x + player.width) > gem.x && player.y < (gem.y + gem.height) && (player.height + player.y) > gem.y) {
        this.addScore();
    }
}

Gem.prototype.addScore = function(){
    score += this.score;
    dashScore.innerHTML = score;
    updateScore();
    this.x = getRandomNumber(50, 450);
    this.y = getRandomNumber(37, 300);
    this.type = gemTypes[Math.floor(Math.random() * gemTypes.length)]; // get random item from an array
    // new Gem();
}

/*========================= End Enemies */

// Start Player object
class Player {
    constructor(x, y) {
        // The image/soul for our player, this uses, the default soul is the boy
        this.soul = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 85;
        // player lifes
        this.life = 3;
    }
    // Draw the Player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.soul), this.x, this.y);
    };
    // Parameter: dt, a time delta between ticks
    update() {
        if (player.y === -35) {
            addScore();
        }
        playAgain.addEventListener('click', () => {
            init();
            reset();
            modal.style.display = "none";
        });
    }
    // handle player movement
    handleInput(keyCode) {
        switch (keyCode) {
            case "up":
                if (this.y > -35) {
                    this.y -= 85;
                }
            break;
            case "down":
                if (this.y < 390) {
                    this.y += 85;
                }
            break;
            case "left":
                if (this.x > 0) {
                    this.x -= 100;
                }
            break;
            case "right":
                if (this.x < 400) {
                    this.x += 100;
                }
            break;
        }
    }
};

// select chrachter

const characters = document.querySelectorAll(".character");
for (let i = 0; i < characters.length; i++) {
    // Loop over Character Images and Change the Selected one based on a 'Click' event
    characters[i].addEventListener("click", function () {
        // Change the player image
        player.soul =  characters[i].getAttribute("src");
    });
}


// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (event) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[event.keyCode]);
});

// check Collisions function.
function checkCollisions() {
    allEnemies.forEach(function (enemy) {
        if (player.x < (enemy.x + enemy.width) && (player.x + player.width) > enemy.x && player.y < (enemy.y + enemy.height) && (player.height + player.y) > enemy.y) {
            player.life--;
            player.x = 200;
            player.y = 390;
            if (player.life === 0) {
                modal.style.display = "block";
                dashScore.innerHTML = score;
                modalScore.innerHTML = score;
            }
            life.innerHTML = `X ${player.life}`
        }
    });
}

// sore function
function addScore() {
    score += 20;
    dashScore.innerHTML = score;
    player.x = 200;
    player.y = 390;
    updateScore();
}

function updateScore(){
    if (score % 100 === 0 ){
        player.life++
        life.innerHTML = `X ${player.life}`;
    }
}

// Place all enemy objects in an array called allEnemies
let allEnemies = [],
    yArray = [
        50, 50, 50, 50, 50, 50, 50, 135, 135, 135, 135, 135, 135, 135, 135, 135, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220
    ];

// initialize the game
function init() {
    score = 0;
    life.innerHTML = `X ${player.life}`;
    dashScore.innerHTML = score;
    allEnemies = [];
    for (let i = 0; i < 5; i++) {
        let x = -50,
            y = yArray[Math.floor(Math.random() * yArray.length)];
        allEnemies.push(new Enemy(x, y));
    }
}

// reset the player data when it dies
function reset() {
    player.x = 200;
    player.y = 390;
    player.life = 3;
    life.innerHTML = `X ${player.life}`;
}

// Place the player object in a variable called player
var gem = new Gem();
var player = new Player(200, 390);

init();

