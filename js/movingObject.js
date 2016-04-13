
var DEFAULTS = {
  POS: [100,380],
  VEL: [5,0],
  WIDTH: 100,
  HEIGHT: 20,
	COLOR: "#ff0000",

};


var MovingObject = function (options) {
  this.pos = options.pos || DEFAULTS.POS;
  this.vel = options.vel || DEFAULTS.VEL;
  this.width = options.width || DEFAULTS.WIDTH;
  this.height = options.height || DEFAULTS.HEIGHT;
  this.color = options.color || DEFAULTS.COLOR;
  this.game = options.game;
};


MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;

  ctx.fillRect(this.pos[0], this.pos[1],this.width, this.height);
};

var NORMAL_FRAME_TIME_DELTA = 1000/60;
MovingObject.prototype.move = function (timeDelta) {
  var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  if (this.game.isOutOfBounds(this.pos, this.width)) {
    this.vel = [-this.vel[0],this.vel[1]];
  }

};


MovingObject.prototype.stopRectangle = function (previousRectangle){
  if (this.pos[0] < previousRectangle.pos[0]){//stick out left
    this.width = this.pos[0] + this.width - previousRectangle.pos[0];
  } else if (this.pos[0] > previousRectangle.pos[0]){//sticks out right
    this.width = previousRectangle.pos[0]+ previousRectangle.width - this.pos[0];
  }

  if (this.pos[0] < previousRectangle.pos[0]){
    this.pos[0]=previousRectangle.pos[0];
  }
  this.vel = [0,0];
  return this.width;
};


MovingObject.prototype.type = "MovingObject";
module.exports = MovingObject;
