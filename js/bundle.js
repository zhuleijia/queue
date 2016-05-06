/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(2);
	
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// var Rectangle = require("./rectangle");
	var GameView = __webpack_require__(2);
	var MovingObject = __webpack_require__(3);
	var highScore;
	var Game = function () {
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
	  endScreen.className = "hide";
	  gameScreen.className = "show";
	
	  game.resetGame();
	};
	var WelcomeScreenEvent = function(event) {
	  endScreen.className = "hide";
	  startScreen.className = "start-screen";
	  console.log("go back to instructions");
	  console.log(highScore);
	};
	
	Game.prototype.goToEndScreen = function () {
	    game = this;
	    endScreen.className = "end-screen";
	    gameScreen.className = "hide";
	    if (this.score > this.highestScore){
	      this.highestScore = this.score;
	    }
	    highScore = this.highestScore;
	    if (this.score === this.highestScore){
	      score.children[0].innerHTML = "Congraduation! New Record! "+ "You managed to stack <span>" + this.score+ "</span> blocks! ";
	    }
	    else{
	      score.children[0].innerHTML = "You managed to stack <span>" + this.score+ "</span> blocks! " + "The Highest Record is <span>" + this.highestScore + "</span>" + " blocks";
	    }
	    // playAgainButton.addEventListener("click", playAgainEvent);
	    returnToWelcomeScreenButton.addEventListener("click", WelcomeScreenEvent);
	
	  };
	  Game.prototype.resetGame = function () {
	    var newGame = new Game();
	    var canvas = document.getElementById("queue-canvas");
	    canvas.width = Game.DIM_X;
	    canvas.height = Game.DIM_Y;
	    var ctx = canvas.getContext("2d");
	    new GameView(newGame, ctx).start();
	    // playAgainButton.removeEventListener("click",playAgainEvent);
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	var GameView = function (game, ctx) {
	  this.ctx = ctx;
	  this.game = game;
	  // debugger;
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
	
	  key("space, return", function () {
	     currentRectangle = that.currentRectangle;
	     previousRectangle = that.previousRectangle;
	    if ((currentRectangle.pos[0] < previousRectangle.pos[0] &&
	      currentRectangle.pos[0]+currentRectangle.width < previousRectangle.pos[0]) ||
	    (currentRectangle.pos[0] > previousRectangle.pos[0] +previousRectangle.width &&
	      currentRectangle.pos[0]+currentRectangle.width > previousRectangle.pos[0]+previousRectangle.width) ){
	        key.unbind('return, space');
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map