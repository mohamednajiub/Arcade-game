// initialize the Game variable
const modal = document.querySelector('.modal'),
    playAgain = document.getElementById('playAgain'),
    life = document.querySelector('.life'),
    dashScore = document.querySelector('.score'),
    modalScore = document.getElementById('score');

let score;



// Random function to calculate speed of the enemy
function getRandomSpeed(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// Enemies that must our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = getRandomSpeed(1, 10);
    this.width = 50;
    this.height = 85;
    // The image/soul for our enemies, this uses
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


// Start Player object
class Player {
    constructor(x, y) {
        // Variables applied to each of our instances go here
        // The image/soul for our player, this uses, the default soul is the boy
        this.soul = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 85;
        // player lifes
        this.life = 5;
    }
    // Draw the Player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.soul), this.x, this.y);
    };
    // Parameter: dt, a time delta between ticks
    update(dt) {
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

function select(){
    const characters = document.querySelectorAll(".character");
    for (let i = 0; i < characters.length; i++) {
        // Loop over Character Images and Change the Selected one based on a 'Click' event
        characters[i].addEventListener("click", () => {
            // Change the player image
            player.soul = "'" + characters[i].getAttribute("src") + "'";
            player.update();
        });
    }
}

// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// check Collisions function.
function checkCollisions() {
    allEnemies.forEach(function (enemy) {
        if (player.x < (enemy.x + enemy.width) && (player.x + player.width) > enemy.x && player.y < (enemy.y + enemy.height) && (player.height + player.y) > enemy.y) {
            player.life--;
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

function addScore() {
    score += 20;
    dashScore.innerHTML = score;
    player.x = 200;
    player.y = 390;
    if (score % 100 == 0 ){
        player.life++
        life.innerHTML = `X ${player.life}`;
    }
}


// Place all enemy objects in an array called allEnemies
let allEnemies = [],
    yArray = [50, 50, 50, 50, 50, 50, 50, 135, 135, 135, 135, 135, 135, 135, 135, 135, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220, 220];

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
    player.life = 5;
    life.innerHTML = `X ${player.life}`;
}

// Place the player object in a variable called player
var player = new Player(200, 390);
init();

