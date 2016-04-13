var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.previousRectangle = this.game.addBaseRectangle();
  this.currentRectangle = this.game.addRectangles();
};


GameView.prototype.start = function () {
  this.bindKeyHandlers();
  this.lastTime = 0;
  //start the animation
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(time){
  var timeDelta = time - this.lastTime;

  this.game.moveObjects(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  //every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function () {
  var that = this;
  var game = this.game;
  var width;
  var vel;
  console.log("begin");
  key("return", function () {
    var currentRectangle = that.currentRectangle;
    var previousRectangle = that.previousRectangle;
    if ((currentRectangle.pos[0] < previousRectangle.pos[0] &&
      currentRectangle.pos[0]+currentRectangle.width < previousRectangle.pos[0]) ||
    (currentRectangle.pos[0] > previousRectangle.pos[0] +previousRectangle.width &&
      currentRectangle.pos[0]+currentRectangle.width > previousRectangle.pos[0]+previousRectangle.width) ){
      window.alert("you lose");

    } else{
      vel = currentRectangle.vel;
      currentRectangle.stopRectangle(previousRectangle);
      width = currentRectangle.width;
      game.moveDownRectangles();
      previousRectangle = currentRectangle;
      currentRectangle = game.addRectangles(width, vel);

      that.previousRectangle = previousRectangle;
      that.currentRectangle = currentRectangle;
    }
  });
};

module.exports = GameView;
