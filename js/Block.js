var Block = function(element,x,y){
    this.element = element;
    this.x = x;
    this.y = y;
    this.isMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.isEmpty = false;
    this.mineCount = 0;

    this.setMine = function() {
        this.isMine = true;
     }

     this.setEmpty = function() {
        this.isEmpty = true;
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

     this.setRevealed = function() {
      this.isRevealed = true;
      this.element.classList.add('is-revealed');
   }

   /*
   this.removeBlast = function(ele){
      ele.classList.remove('blast');
   } 
   */
   this.reveal = function() {
      var className;

      this.setRevealed();

      if (this.isMine) {

         //bursting gif
       //  this.element.classList.add('blast');
         //delay
      //   setTimeout(this.removeBlast(this.element),2000);
         //remove bursting gif

         return this.element.classList.add('is-mine');
      }

      if (this.isEmpty) {
         return this.element.classList.add('is-empty');
      }

      //this.element.innerHTML = this.mineCount;

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


