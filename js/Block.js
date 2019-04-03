var Block = function(element,x,y){
    this.element = element;
    this.x = x;
    this.y = y;
    this.isEmpty = false;
    this.isMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.mineCount = 0;

    this.setEmpty = function() {
      this.isEmpty = true;
      
   }

    this.setMine = function() {
        this.isMine = true;
    }

    this.setRevealed = function() {
      this.isRevealed = true;
      this.element.classList.add('is-revealed');
   }
  
     this.setMineCount = function(number) {
        this.mineCount = number;
     }

     this.setFlagged = function() {
      this.isFlagged = true;
      this.element.classList.add('is-flagged');
   }

   this.setUnflagged = function() {
      this.isFlagged = false;
      this.element.classList.remove('is-flagged');
   }

   this.reveal = function() {
      var className;

      this.setRevealed();

      if (this.isMine) {
        return this.element.classList.add('is-mine');
      }

      if (this.isEmpty) {
         this.mineCount=0;
         return this.element.classList.add('is-empty');
      }

      if (this.mineCount == 1) {
         className = 'is-one';
      } else if (this.mineCount == 2) {
         className = 'is-two';
      } else if (this.mineCount == 3) {
         className = 'is-three';
      }
      else if (this.mineCount == 4) {
         className = 'is-four';
      }
      else if (this.mineCount == 5) {
         className = 'is-five';
      }
      else if (this.mineCount == 6) {
         className = 'is-six';
      }
      else if (this.mineCount == 7) {
         className = 'is-seven';
      }else {
         className = 'is-eight';
      }

      this.element.classList.add(className);
   }

}


