var Game = function(dimension,mines){

    var elements;
    /*this.levels = {
        beginner: {
           dimension: 9,
           mineCount: 10
        },
        intermediate: {
           dimension: 16,
           mineCount: 40
        },
        advanced: {
           dimension: 21,
           mineCount: 80
        }
     }
     */
     this.element={};
   //  this.element.level = document.querySelector(".game-level");
     this.element.mine = document.querySelector("#mines-count");
     this.element.time = document.querySelector("#game-time");
     this.element.restart = document.querySelector(".game-restart");
     this.element.board = document.querySelector(".game-board");
/*
     console.log("element.level:"+this.element.level);
     console.log("element.mine:"+this.element.mine);
     console.log("element.time:"+this.element.time);
     console.log("element.restartButton:"+this.element.restart);
     console.log("element.board:"+this.element.board);
     */

    this.timer = null; /* time interval*/
    this.dimension = dimension;
    this.mineCount = mines;
    this.time = 0;

    this.isGameOver = false;
    this.initialize = false;
    
    this.leftMineCount = this.mineCount;

    //this.setLevel(level);
    this.board = new Board(this.element.board);

    this.init();

}
/*
Game.prototype.setLevel = function(level) {
    var option;
 
    this.dimension = this.levels[level].dimension;
    this.mineCount = this.levels[level].mineCount;
 
    option = this.element.level.querySelector('option[value="'+ level +'"]');
    option.selected = true;
 }
 */

 Game.prototype.startTimer = function() {
    this.timer = setInterval(function() {
       ++this.time;
       this.element.time.textContent = this.time;
    }.bind(this), 1000);
 }
 
 Game.prototype.stopTimer = function() {
    clearInterval(this.timer);
 }

 Game.prototype.init = function() {
    this.isGameOver = false;
    this.time = 0;
    this.element.time.textContent = 0;
    this.element.mine.textContent = this.mineCount;
    this.leftMineCount = this.mineCount;
 
    this.stopTimer();
    this.board.init(this.dimension, this.mineCount);
    
    if (! this.initialize) {
      // this.listen();
    }
 
    this.initialize = true;
 }