var Block = function(element,x,y){
    this.element = element;
    this.x = x;
    this.y = y;
    this.isMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.isEmpty = false;
    this.mineCount = 0;
}