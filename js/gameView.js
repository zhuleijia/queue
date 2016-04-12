var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.rectangle = this.game.addRectangles();
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
  var rectangle = this.rectangle;

  key("return", function () { rectangle.nextRectangle() });
};

module.exports = GameView;
