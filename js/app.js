// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 50;
    this.height = 50;
    // The image/sprite for our enemies, this uses
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 500) {
        this.x = -100;
    } else {
        this.x += 50 * this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Start Player object
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    // The image/sprite for our player, this uses
    this.sprite = 'images/char-boy.png';
};

// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // return this.y;
};
Player.prototype.handleInput = function(keyCode) {
    switch(keyCode) {
        case "up":
            if(this.y > -35) {
                this.y -= 85;
            }
        break;
        case "down":
            if(this.y < 390) {
                this.y += 85;
            }
        break;
        case "right":
            if(this.x < 400 ) {
                this.x += 100;
            }
        break;
        case "left":
            if(this.x > 0) {
                this.x -= 100;
            }
        break;
    }
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
function init(){
    allEnemies = [];
    yArray = [50,50,50,50,50,50,50,135,135,135,135,135,135,135,135,135,220,220,220,220,220,220,220,220,220,220,220,220];
    for (let i = 0; i < 5; i++) {
        let x = -50,
            y = yArray[Math.floor(Math.random() * yArray.length)],
            speed = Math.floor(Math.random() * 11);
        allEnemies.push(new Enemy(x, y, speed));
    }
}
// Place the player object in a variable called player
init();
var player   = new Player(200, 390);

