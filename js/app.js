var rows = [];
var cols = [];
var box = {};
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
    this.row = box.row;
    this.col = box.col;
};
// col - 101, row - 83 enemy allowed rows - 109
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
// handle collision
checkCollision(player,this);

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
this.row = box.row;
this.col = box.col;
};

Player.prototype.render = function()
{
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};

Player.prototype.handleInput = function(keypress)
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

// shield from water
if (this.y <83)
{
    this.y = 498;
}
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies = [];
for (var i = 0; i <6; i++)
{
    allEnemies[i] = new Enemy(0, random(84,331), random(10,50)); 
}


var setRange = function(dim,minterm,maxterm,difference,interval)
{
    dim.min = minterm + difference*interval;
    dim.max = maxterm + difference*interval;
}
var checkBox = function(person)
{
    //check rows
    for ( var i = 0; i <6; i++)
    {
        rows[i] = new Object();
        setRange(rows[i],0,83,i,83);
        if(person.y < rows[i].max && person.y > rows[i].min)
        {
          box.row = i;
        }
    }
    //checks columns
    for (var j=0; j<5; j++)
    {
        cols[j] = new Object();
        setRange(cols[j],0,101,j,101);
        if(person.x < cols[j].max && person.x > cols[j].min)
        {
            box.col = j;
        }
    }
   

}// sets row number - 1 and col number -1

var checkCollision = function(person,object)
{
 checkBox(person);
 checkBox(object);
 if ( person.row === object.row && person.col === object.col)
 {
    console.log("collided");
 }
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

    Player.handleInput(allowedKeys[e.keyCode]);
});

function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
