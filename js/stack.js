
var Game = require('./game');
var GameView = require('./gameView');


var canvas = document.getElementById("queue-canvas");
canvas.width = Game.DIM_X;
canvas.height = Game.DIM_Y;
var ctx = canvas.getContext("2d");
var game = new Game();

var startScreen = document.getElementsByClassName("start-screen")[0],
    gameScreen = document.getElementById("queue-canvas"),
    startButton = document.getElementsByClassName("start-button")[0];

var fn3 = function(event) {
  startScreen.className = "hide";
  gameScreen.className = "show";

  new GameView(game, ctx).start();
};

  startButton.addEventListener("click", fn3);

  // startButton.removeEventListener("click", fn3);
