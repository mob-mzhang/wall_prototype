// Frank Poth 03/09/2018

/* The keyDownUp handler was moved to the main file. */

const Controller = function() {

    this.space  = new Controller.ButtonInput();

  
    this.keyDownUp = function(type, key_code) {
  
      var down = (type == "keydown") ? true : false;
  
      switch(key_code) {
  
        case 32: this.space.getInput(down);  break;

      }
  
    };
  
  };
  
  Controller.prototype = {
  
    constructor : Controller
  
  };
  
  Controller.ButtonInput = function() {
  
    this.active = this.down = false;
  
  };
  
  Controller.ButtonInput.prototype = {
  
    constructor : Controller.ButtonInput,
  
    getInput : function(down) {
  
      if (this.down != down) this.active = down;
      this.down = down;
  
    }
  
  };