var Game = function(dimension,mines){

    var elements;
    
     this.element={};
     this.element.mine = document.querySelector("#mines-count");
     this.element.time = document.querySelector("#game-time");
     this.element.restart = document.querySelector(".game-restart");
     this.element.board = document.querySelector(".game-board");
/*
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

    this.board = new Board(this.element.board);

    this.blast=0;
    this.blastCount=0;
    this.init();

}

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
   // this.isGameOver = false;
    this.time = 0;
    this.element.time.textContent = 0;
    this.element.mine.textContent = this.mineCount;
    this.leftMineCount = this.mineCount;
 
    this.stopTimer();
    this.board.init(this.dimension, this.mineCount);
    
    if (! this.initialize) {
       this.eventListener();
    }
 
    this.initialize = true;
 }


 Game.prototype.eventListener = function() {
   this.element.restart.addEventListener('click', this.restartHandler.bind(this));
   this.board.element.addEventListener('click', this.leftClickHandler.bind(this));
   //this.board.element.addEventListener('contextmenu', this.rightClickHandler.bind(this));
}

Game.prototype.restartHandler = function() {
   location.reload();
  // this.init();
}

Game.prototype.leftClickHandler = function(event) {
   
  //if left click on block
  if(event.target.classList.contains('block')){
      var block = this.findBlock(event);

      if (this.time == 0) {
         this.startTimer();
      }

      if (block.isFlagged) {
         return;
      }
      else if (block.isEmpty) {
         this.board.revealNeighbourBlocks(block);
      }
      else if(!block.isMine){
         block.reveal();
         if (this.isWin()) {
            return this.gameover(true);
         }
      }
      else{
         //blast mines
         
         //this.blast=setInterval(this.blastMines,2000);
         var flag;
         var blastCount=0;
         this.stopTimer();
         console.log("block:"+block.isMine);
         flag=setInterval(function(){
            if (blastCount == 7) {
               clearInterval(flag);
              
               return this.gameover(false);
             } else {
               blastCount++; 
               block.element.classList.add('blast')
               console.log("blastCount"+blastCount);
             }
         }.bind(this),1000)

         //return this.gameover(false);
      }
  }
   
}

//find block on which event occured
Game.prototype.findBlock = function(event) {
   var x = event.target.getAttribute('x');
   var y = event.target.getAttribute('y');
   return this.board.blocks[y][x];
}

Game.prototype.isWin = function() {
   console.log("unRevealedBlocks Length:"+this.board.unRevealedBlocks().length);
   return this.board.unRevealedBlocks().length == this.mineCount;
   //return this.board.unRevealedBlocks().length <= this.mineCount;
}

Game.prototype.gameover = function(win) {

   this.stopTimer();
   this.isGameOver = true;
   this.board.reveal();
   console.log("board revealed");

   if (win) {
      alert('Yippie, You Won!');
   }
   else{
      alert('You Lost!');
   }
   
}

Game.prototype.blastMines=function(){
   if (this.blastCount == 7) {
      clearInterval(this.blast);
      return this.gameover(false);
    } else {
      this.blastCount++; 
      console.log("blastCount"+this.blastCount);
    }
}