// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
// col - 101, row - 83 enemy allowed rows - 109
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += speed * dt;
// handle collision

//go back to beginning
  if (this.x >= 505) {
        this.x = 0;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
this.sprite =  'images/char-boy.png';
this.x = 252.5;
this.y = 498;
this.speed = 50;
};

Player.prototype.render = function()
{
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};

Player.protptype.handleInput = function(keypress)
{
    //keyboard controls
if(keypress === 'left')
{
    this.x -= this.speed;
}
 if(keypress === 'right')
{
    this.x += this.speed;
}
 if(keypress === 'up')
{
    this.y -= this.speed;
}
 if(keypress === 'down')
{
    this.y += this.speed;
}

//prevents player from sliding off the screen
if ( this.x <0)
{
    this.x = 0;
}
if (this.y < 0)
{
    this.y = 0;
}
if(this.x > 505)
{
    this.x = 505;
}
if(this.y >498)
{
    this.y = 498;
}
}
// shield from water
if (this.y <83)
{
    this.y = 498;
}
;
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies = [];
for (var i = 0; i <6; i++)
{
    var allEnemies[i] = new Enemy(0, random(84,331), random(10,50)); 
}
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


function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
