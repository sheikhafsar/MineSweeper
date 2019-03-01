
var Board = function(element){
    this.element = element;
    this.dimension = 0;
    this.mineCount = 0;
    this.blocks = [];

    this.init = function(dimension, mineCount) {
        this.dimension = dimension;
        this.mineCount = mineCount;
  
        this.draw();
    //    this.plantMines();
    //    this.calculate();
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

     this.clearFix = function() {
        var element = document.createElement('div');
        element.classList.add('clearfix');
        this.element.appendChild(element);
     }
}


 
