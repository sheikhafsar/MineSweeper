var Game = function(dimension,mines){

    var elements;
    
     this.element={};
     this.element.mine = document.querySelector("#mines-count");
     this.element.time = document.querySelector("#game-time");
     this.element.restart = document.querySelector(".game-restart");
     this.element.board = document.querySelector(".game-board");

     var popAudio = document.getElementById("popAudio"); 
     popAudio.playbackRate=2.0;
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
    
    this.leftMine = this.mineCount;

    this.board = new Board(this.element.board);

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
  
    this.time = 0;
    this.element.time.textContent = 0;
    this.element.mine.textContent = this.mineCount;
    this.leftMine = this.mineCount;
 
    
    this.board.init(this.dimension, this.mineCount);
    
    if (! this.initialize) {
      this.element.restart.addEventListener('click', this.restartHandler.bind(this));
      this.board.element.addEventListener('click', this.leftClickHandler.bind(this));
      this.board.element.addEventListener('contextmenu', this.rightClickHandler.bind(this));
   }
 
    this.initialize = true;

    //output to console, block data for cheating
    
    var mines = this.board.Mines();
    mines.forEach(mineblock => {
       console.log("mineBlock["+mineblock.x+"]"+"["+mineblock.y+"]");
    });

    var empty = this.board.emptyBlock();
    empty.forEach(emptyBlock => {
      console.log("emptyBlock["+emptyBlock.x+"]"+"["+emptyBlock.y+"]");
   });

   var two = this.board.block2();
    two.forEach(block2 => {
      console.log("block2["+block2.x+"]"+"["+block2.y+"]");
   });
 }


Game.prototype.restartHandler = function() {
   location.reload();
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
         this.element.restart.classList.remove('care-smile');
         this.element.restart.classList.add('default-smile');
      }
      else if(!block.isMine){
         block.reveal();

         console.log("block.mineCount:"+block.mineCount);
         if(block.mineCount>1){
            console.log("mine is more than 1");

            this.element.restart.classList.add('care-smile');
         }
         else {
            console.log("block.mineCount: "+block.mineCount);
            this.element.restart.classList.remove('care-smile');
         }

         if (this.isWin()) {
            this.element.restart.classList.remove('default-smile');
            this.element.restart.classList.remove('care-smile');
            this.element.restart.classList.add('win-smile');
            return this.gameover(true);
         }
      }
      else{
         //blast mines
         this.element.restart.classList.remove('care-smile');
         this.element.restart.classList.add('dead-smile');
         this.blastMines(block);
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

Game.prototype.blastMines = function (block) {
   var flag;
   var blastCount = 0;
   var Mines = this.board.Mines();
   
   console.log("MinesLength:" + Mines.length);
   this.stopTimer();
   //block.reveal();

   popAudio.play();
   block.element.classList.add('blast');
  
   console.log("block:" + block.isMine);

   flag = setInterval(function () {
      if (blastCount == this.mineCount) {
         clearInterval(flag);
         return this.gameover(false);
      } else {
         console.log("MineCount:" + this.mineCount);
         for (blastCount; blastCount < this.mineCount;) {
            if( !Mines[blastCount].element.classList.contains('blast')){
               
               if(Mines[blastCount].isFlagged){
                  Mines[blastCount].setUnflagged();
               }
               popAudio.play();
               Mines[blastCount].element.classList.add('blast');
            }
           
               blastCount++;
             
               console.log("mine");
               console.log("blastCount" + blastCount);
               break; 
         }
      }
   }.bind(this), 2000);

}

Game.prototype.rightClickHandler = function(event) {
   event.preventDefault();

   if(event.target.classList.contains('block'))
   {
   var block = this.findBlock(event);

      if (block.isFlagged) {
         this.leftMine++;
         this.element.mine.textContent = this.leftMine;
         block.setUnflagged();
      } 
      else 
      {
         this.leftMine--;
         this.element.mine.textContent = this.leftMine;
         block.setFlagged();
      }
   }
}

