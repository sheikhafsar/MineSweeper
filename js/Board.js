
var Board = function(element){
    this.element = element;
    this.dimension = 0;
    this.mineCount = 0;
    this.blocks = [];


    this.init = function(dimension, mineCount) {
        this.dimension = dimension;
        this.mineCount = mineCount;
  
        this.draw();
        this.plotMines();
        this.setBlockData();
     }

     this.draw = function() {
        this.element.innerHTML = "";
        var block, br;
    
        for (var y = 0; y < this.dimension; y++) {
           this.blocks[y] = [];
    
           for (var x = 0; x < this.dimension; x++) {
              block = document.createElement('span');
              block.className = 'block';
              block.setAttribute('x', x);
              block.setAttribute('y', y);
              this.element.appendChild(block);
              this.blocks[y][x] = new Block(block, x, y);
           }
    
           this.clearFix();
        }
    
        this.clearFix();
     }

     

     this.plotMines = function() {
      var plottedMines = 0;
      var x,y,block;

      while (plottedMines < this.mineCount) {
         x = this.generateRandNum(this.dimension);
         y = this.generateRandNum(this.dimension);
         block = this.blocks[y][x];

         if (! block.isMine) {
            block.setMine();
            plottedMines++;
         }
         //console.log("X:"+x+"Y:"+y);
      }
      //console.log("plottedMines:"+plottedMines);
   }

   this.setBlockData = function() {
      var x, y, block, mineCount;

      for (y = 0; y < this.dimension; y++) {
         for (x = 0; x < this.dimension; x++) {
            block = this.blocks[y][x];
            var neighbourblocks = this.findNeighbours(block);
            mineCount = 0;

            if (! block.isMine) {
              neighbourblocks.forEach(function(blockVal){
                  if (blockVal.isMine) {
                     mineCount++
                  }
               });//count mines in neighbourhood
               
               if(mineCount == 0){
                  block.setEmpty()
                }else{
                  block.setMineCount(mineCount);
                } 
               //console.log("blocks["+y+"]["+x+"] "+"Minecount:"+block.mineCount);
            }
         }
      }
   }

}


Board.prototype.clearFix = function() {
   var element = document.createElement('div');
   element.classList.add('clearfix');
   this.element.appendChild(element);
}

Board.prototype.generateRandNum = function(num) {
 var randNum = Math.floor(Math.random() * (num - 1)) + 1;
 return randNum;
}

Board.prototype.reveal = function() {
   for (var y = 0; y < this.dimension; y++) {
      this.blocks[y].forEach(function(block) {
         block.reveal();
      });
   }
}

Board.prototype.findNeighbours = function(block) {
   var blocks = [];

   // top neighbour blocks
   if (block.y != 0) {
      blocks.push(this.blocks[block.y - 1][block.x]);
   }

   // bottom neighbour blocks
   if (block.y != this.dimension - 1) {
      blocks.push(this.blocks[block.y + 1][block.x]);
   }

   // left neighbour blocks
   if (block.x != 0) {
      blocks.push(this.blocks[block.y][block.x - 1]);
   }

   // right neighbour blocks
   if (block.x != this.dimension - 1) {
      blocks.push(this.blocks[block.y][block.x + 1]);
   }

   // upper left neighbour blocks
   if (block.y != 0 && block.x != 0) {
      blocks.push(this.blocks[block.y - 1][block.x - 1]);
   }

   // upper right neighbour blocks
   if (block.y != 0 && block.x != this.dimension - 1) {
      blocks.push(this.blocks[block.y - 1][block.x + 1]);
   }

   // lower left neighbour blocks
   if (block.y != this.dimension - 1 && block.x != 0) {
      blocks.push(this.blocks[block.y + 1][block.x - 1]);
   }

   // lower right neighbour blocks
   if (block.y != this.dimension - 1 && block.x != this.dimension - 1) {
      blocks.push(this.blocks[block.y + 1][block.x + 1]);
   }

   return blocks;
}

Board.prototype.revealNeighbourBlocks = function(block) {
   var x,
   neighbourBlock,
   neighbours = this.findNeighbours(block);

   for (x = 0; x < neighbours.length; x++) {
      neighbourBlock = neighbours[x];

      //skip revealed/flagged/mine blocks
      if (neighbourBlock.isRevealed || neighbourBlock.isFlagged || neighbourBlock.isMine) {
         continue;
      }

      neighbourBlock.reveal();

      if (neighbourBlock.isEmpty) {
         this.revealNeighbourBlocks(neighbourBlock);
      }
   }
}

Board.prototype.reducedBlocks = function() {
   return this.blocks.reduce(function(a, b) {
      return a.concat(b);
   });
}

Board.prototype.unRevealedBlocks = function() {
   return this.reducedBlocks().filter(function(block) {
      return ! block.isRevealed;
   });
}

//return mine blocks
Board.prototype.Mines = function() {
   return this.reducedBlocks().filter(function(block) {
      return  block.isMine;
   });
}

//return empty blocks
Board.prototype.emptyBlock = function() {
   return this.reducedBlocks().filter(function(block) {
      return  block.isEmpty;
   });
}

//return blocks surrounded by two mines
Board.prototype.block2 = function() {
   return this.reducedBlocks().filter(function(block) {
      return  block.mineCount==2;
   });
}