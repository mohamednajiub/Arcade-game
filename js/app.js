// initialize the variable
const modal = document.querySelector('.modal'),
    playAgain = document.getElementById('playAgain'),
    live = document.querySelector('.live'),
    dashScore = document.querySelector('.score'),
    modalScore = document.getElementById('score');

let lives,
    score;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 50;
    this.height = 85;
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
    this.width = 75;
    this.height = 85;
    // The image/sprite for our player, this uses
    this.sprite = 'images/char-boy.png';
};

// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    if (player.y === -35 ) {
        addScore();   
    }
    
    playAgain.addEventListener('click',()=>{
        init();
        player.x = 200;
        player.y = 390;
        modal.style.display = "none";
    })
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
        case "left":
            if(this.x > 0) {
                this.x -= 100;
            }
        break;
        case "right":
            if(this.x < 400 ) {
                this.x += 100;
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
// check Collisions function.
function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height && player.height + player.y > enemy.y) {
            
            lives --;
            player.y = 390;
            if (lives === 0 ){
                lives = 0;
                modal.style.display = "block";
                dashScore.innerHTML = score;
                modalScore.innerHTML = score;
            }
            live.innerHTML = `X${lives}`
        }
    });
}

function addScore() {
    score += 20;
    dashScore.innerHTML = score;
    player.x = 200;
    player.y = 390;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [],
    yArray = [50,50,50,50,50,50,50,135,135,135,135,135,135,135,135,135,220,220,220,220,220,220,220,220,220,220,220,220];
function init(){
    lives = 3;
    score = 0;
    live.innerHTML = `X${lives}`;
    dashScore.innerHTML = score;
    allEnemies = [];
    for (let i = 0; i < 5; i++) {
        let x = -50,
            y = yArray[Math.floor(Math.random() * yArray.length)],
            speed = Math.floor(Math.random() * 11);
            // making sure speed will not equal 0
            if (speed === 0){
                speed += 5;
            }
        allEnemies.push(new Enemy(x, y, speed));
    }
    
}
// Place the player object in a variable called player
init();
var player = new Player(200, 390);
