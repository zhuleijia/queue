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


  startButton.addEventListener("click", function(event) {
    startScreen.className = "hide";
    gameScreen.className = "show";

    new GameView(game, ctx).start();
  });

  startButton.removeEventListener("click", function(event) {

    startScreen.className = "hide";
    gameScreen.className = "show";

    new GameView(game, ctx).start();
  });
