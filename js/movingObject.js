
var DEFAULTS = {
  POS: [50,280],
  VEL: [3,0],
  WIDTH: 200,
  HEIGHT: 20,
};


var MovingObject = function (options) {
  this.pos = options.pos || DEFAULTS.POS;
  this.vel = options.vel || DEFAULTS.VEL;
  this.width = options.width || DEFAULTS.WIDTH;
  this.height = options.height || DEFAULTS.HEIGHT;
  this.color = options.color || this.getRandomColor();
  this.game = options.game;
};

MovingObject.prototype.getRandomColor = function () {

    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

MovingObject.prototype.getDarkerColor = function (hex,lum) {

	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
};

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.pos[0], this.pos[1],this.width, this.height);

  ctx.fillStyle = this.getDarkerColor(this.color,-0.5);
  ctx.beginPath();
  ctx.moveTo(this.pos[0],this.pos[1]);
  ctx.lineTo(this.pos[0]+5,this.pos[1]-5);
  ctx.lineTo(this.pos[0]+5+this.width,this.pos[1]-5);
  ctx.lineTo(this.pos[0] + this.width,this.pos[1]);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = this.getDarkerColor(this.color,-0.5);
  ctx.beginPath();
  ctx.moveTo(this.pos[0]+this.width,this.pos[1]);
  ctx.lineTo(this.pos[0]+this.width + 5 ,this.pos[1] - 5);
  ctx.lineTo(this.pos[0]+this.width + 5,this.pos[1] -5 + this.height);
  ctx.lineTo(this.pos[0]+this.width,this.pos[1]+this.height);
  ctx.closePath();
  ctx.fill();


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
