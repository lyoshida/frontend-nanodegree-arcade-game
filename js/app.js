'use strict';

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // Sets initial position of a Enemy
    this.x = -1;
    this.y = Math.floor(Math.random() * 3);

    // Sets a random speed
    this.speed = (Math.floor(Math.random() * 500) + 100)/100;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, 71 + this.y * 83);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 2;
    this.y = 4;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    if (this.y < 0) {
        //When the player reaches the water, updates position and adds 1 point to the score.
        this.reset();
        this.updateScore();
    }
};

// Resets the player to the initial position
Player.prototype.reset = function() {
    this.x = 2;
    this.y = 4;
};

Player.prototype.updateScore = function() {
    this.score += 1;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, 71 + this.y * 83);

    // Draws score on the screen.
    ctx.clearRect(0,0, 80, 40)
    ctx.font = "25px Arial";
    ctx.fillText(this.score, 10, 35);
};

Player.prototype.handleInput = function(direction) {

    if (direction === 'up' &&  this.y >= 0) {
        this.y -= 1;
    }

    if (direction === 'down' && this.y < 4) {
        this.y += 1;
    }

    if (direction === 'left' && this.x > 0) {
        this.x -= 1;
    }

    if (direction === 'right' && this.x < 4) {
        this.x += 1;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

allEnemies.push(new Enemy());

var player = new Player();

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
