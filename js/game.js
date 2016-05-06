// var Rectangle = require("./rectangle");
var GameView = require("./gameView");
var MovingObject = require('./movingObject');
var Game = function (highScore2) {
  this.reactangles = [];
  this.score = this.reactangles.length;
  console.log("game start");
  console.log(highScore);
  if (highScore == null){
    this.highestScore = 0;
  }else{
    this.highestScore = highScore;
  }

};


Game.BG_COLOR = "#000000";
Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_RECTANGLES = 1;

Game.prototype.addBaseRectangle = function () {

    this.add(new MovingObject({ pos:[150,300],game: this, vel:[0,0]}));

    this.score = this.reactangles.length-1;
    return this.reactangles[this.reactangles.length-1];
};
Game.prototype.moveDownRectangles = function () {

  this.reactangles.forEach(function(rectangle){
    rectangle.pos = [rectangle.pos[0],rectangle.pos[1]+20];
  });
};


Game.prototype.addRectangles = function (width, vel) {
  if (width){
    this.add(new MovingObject({
      width:width,
      vel: [Math.abs(vel[0])+0.3,vel[1]],
      game: this
    }));
  }else{
    this.add(new MovingObject({
      game: this
    }));
  }
    this.score = this.reactangles.length-1;
    return this.reactangles[this.reactangles.length-1];
};

Game.prototype.drawScore = function(ctx){
    ctx.font = "30px san-serif";
    ctx.fillStyle = 'white';
    ctx.fillText("queue: " + this.score, 10, 50);
};
Game.prototype.drawHighestScore = function(ctx){
    ctx.font = "30px san-serif";
    ctx.fillStyle = 'red';
    ctx.fillText("HighestScore: " + this.highestScore, 10, 90);
};

Game.prototype.gameOver = function(){
  if (this.score > this.highestScore){
    this.highestScore = this.score;
  }
  highScore = this.highestScore;
  this.goToEndScreen();
  this.cleanUp();
  // debugger;
};
Game.prototype.cleanUp = function () {
  this.reactangles = [];
  this.score = this.reactangles.length;


};
var endScreen =                   document.getElementById("end-screen"),
    gameScreen =                  document.getElementById("queue-canvas"),
    startScreen =                 document.getElementById("start-screen"),
    score =                       document.getElementById("score"),
    playAgainButton =             document.getElementById("play-again"),
    returnToWelcomeScreenButton = document.getElementById("return-to-welcome-screen");
var playAgainEvent = function(event) {
  // debugger;

  endScreen.className = "hide";
  gameScreen.className = "show";

  game.resetGame();
};
var WelcomeScreenEvent = function(event) {
  endScreen.className = "hide";
  startScreen.className = "start-screen";
  // game.resetGame();
  console.log(highScore);
};
var highScore;
Game.prototype.goToEndScreen = function () {
    // debugger;
    game = this;
    endScreen.className = "end-screen";
    gameScreen.className = "hide";
    score.children[0].innerHTML = "You managed to stack <span>" + this.score+ "</span> blocks! " + "The Highest Record is <span>" + this.highestScore + "</span>" + " blocks";
    playAgainButton.addEventListener("click", playAgainEvent);
    returnToWelcomeScreenButton.addEventListener("click", WelcomeScreenEvent);

  };
  Game.prototype.resetGame = function () {
    var newGame = new Game();
    var canvas = document.getElementById("queue-canvas");
    canvas.width = Game.DIM_X;
    canvas.height = Game.DIM_Y;
    var ctx = canvas.getContext("2d");
    new GameView(newGame, ctx).start();
    playAgainButton.removeEventListener("click",playAgainEvent);
    returnToWelcomeScreenButton.removeEventListener("click",WelcomeScreenEvent);
  };

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.drawScore(ctx);
  this.drawHighestScore(ctx);
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
