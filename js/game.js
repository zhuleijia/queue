// var Rectangle = require("./rectangle");
var MovingObject = require('./movingObject');
var Game = function () {
  this.reactangles = [];

  this.addBaseRectangle();
};

Game.BG_COLOR = "#000000";
Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_RECTANGLES = 1;

Game.prototype.addBaseRectangle = function () {

    this.add(new MovingObject({ pos:[200,400],game: this, vel:[0,0], color:"green" }));
    // debugger;
    return this.reactangles[this.reactangles.length-1];
};



Game.prototype.addRectangles = function () {

    this.add(new MovingObject({ game: this }));
    // debugger;
    return this.reactangles[this.reactangles.length-1];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.reactangles.forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function (delta) {
  this.reactangles.forEach(function (object) {
    object.move(delta);
  });
};

Game.prototype.isOutOfBounds = function (pos, width) {
  return (pos[0] < 0) || (pos[1] < 0) ||
    (pos[0]+width > Game.DIM_X) || (pos[1] > Game.DIM_Y);
};


Game.prototype.add = function (object) {

  if (object.type === "MovingObject") {
    this.reactangles.push(object);
  } else {
    throw "wtf?";
  }
};

module.exports = Game;
