var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.previousRectangle = this.game.addBaseRectangle();
  this.currentRectangle = this.game.addRectangles();


};


GameView.prototype.start = function () {
  this.bindKeyHandlers();
  this.lastTime = performance.now();

  this.token1 = requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.stop = function () {

  window.cancelAnimationFrame(this.token1);
  window.cancelAnimationFrame(this.token2);
  this.game.gameOver();

};


GameView.prototype.animate = function(time){

  var timeDelta = time - this.lastTime;

  this.game.draw(this.ctx);
  this.game.moveObjects(timeDelta);
  this.lastTime = time;

  this.token2 = requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function () {
  var that = this;
  var game = this.game;
  var width;
  var vel;
  var currentRectangle;
  var previousRectangle;

  key("return", function () {
    console.log("return triggerred");
     currentRectangle = that.currentRectangle;
     previousRectangle = that.previousRectangle;
    if ((currentRectangle.pos[0] < previousRectangle.pos[0] &&
      currentRectangle.pos[0]+currentRectangle.width < previousRectangle.pos[0]) ||
    (currentRectangle.pos[0] > previousRectangle.pos[0] +previousRectangle.width &&
      currentRectangle.pos[0]+currentRectangle.width > previousRectangle.pos[0]+previousRectangle.width) ){
      return that.stop();


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
