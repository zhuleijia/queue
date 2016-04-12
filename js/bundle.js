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
	// var Keymaster = require("../vendor/keymaster");
	
	
	document.addEventListener('DOMContentLoaded', function(){
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  var ctx = canvasEl.getContext("2d");
	  var game = new Game();
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// var Rectangle = require("./rectangle");
	var MovingObject = __webpack_require__(3);
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	
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
	
	
	MovingObject.prototype.nextRectangle = function (){
	  this.vel = [0,0];
	};
	
	
	MovingObject.prototype.type = "MovingObject";
	module.exports = MovingObject;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map