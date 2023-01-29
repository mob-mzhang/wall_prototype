// Frank Poth 02/28/2018

/* To keep this example from looking too boring, I made the game logic gradually
change some color values which then get drawn to the display canvas in the loop. */

const Game = function() {


    this.world = {
        background_color:"rgba(40,48,56,0.25)",

        friction:0.7,
        gravity:1,

        columns:30,
        rows:20,
        tile_size:16,
        map:[4,3,3,4,4,4,4,4,25,25,4,4,3,3,3,4,25,3,3,26,26,25,25,4,3,3,3,25,26,26,
            3,4,25,3,3,25,25,4,4,4,3,3,3,25,25,3,4,3,3,25,25,25,3,3,25,26,3,4,3,3,
            4,3,3,26,25,4,4,4,25,26,3,3,3,3,4,4,4,4,4,25,25,25,3,25,4,4,4,4,25,25,
            3,4,4,3,3,3,25,25,25,4,4,4,4,4,3,25,25,26,3,3,4,4,26,26,26,26,4,25,26,3,
            3,4,25,3,3,25,25,4,4,4,3,3,3,25,25,3,4,3,3,25,25,25,3,3,25,26,3,4,3,3,
            4,3,3,26,25,4,4,4,25,26,3,3,3,3,4,4,4,4,4,25,25,25,3,25,4,4,4,4,25,25,
            0,1,1,1,1,2,176,177,177,177,177,178,88,89,89,90,0,1,1,1,2,0,1,1,2,88,89,89,89,90,
            22,23,23,23,23,24,198,199,199,199,199,200,110,111,111,112,22,23,23,23,24,22,23,23,24,110,111,111,111,112,
            44,45,45,45,45,46,220,221,221,221,221,222,132,133,133,134,44,45,45,45,46,44,45,45,46,132,133,133,133,134,
            88,89,89,89,90,176,177,177,177,177,177,177,178,88,89,89,90,88,89,89,89,89,90,0,1,1,1,1,1,2,
            110,111,111,111,112,198,199,199,199,199,199,199,200,110,111,111,112,110,111,111,111,111,112,22,23,23,23,23,23,24,
            132,133,133,133,134,220,221,221,221,221,221,221,222,132,133,133,134,132,133,133,133,133,134,44,45,45,45,45,45,46,
            0,1,1,2,88,89,89,89,89,90,88,89,90,0,1,1,1,1,1,2,176,177,177,177,177,177,178,88,89,90,
            22,23,23,24,110,111,111,111,111,112,110,111,112,22,23,23,23,23,23,24,198,199,199,199,199,199,200,110,111,112,
            44,45,45,46,132,133,133,133,133,134,132,133,134,44,45,45,45,45,45,46,220,221,221,221,221,221,222,132,133,134,
            88,89,89,89,90,176,177,177,177,178,0,1,1,2,176,177,177,178,88,89,89,89,89,89,89,90,0,1,1,2,
            110,111,111,111,112,198,199,199,199,200,22,23,23,24,198,199,199,200,110,111,111,111,111,111,111,112,22,23,23,24,
            132,133,133,133,134,220,221,221,221,222,44,45,45,46,220,221,221,222,132,133,133,133,133,133,133,134,44,45,45,46,
            6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
            28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29],
      
        /* Height and Width now depend on the map size. */
        height: 20*16,
        width: 30*16,

        players:new Game.Players(),
        levels:new Game.Levels(20 * 16),

        collideLevels: function(object){

            console.log(object.y)
            if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; return;}
            for(let curr_level of this.levels.levels){
                if (object.y + object.height > curr_level.y) { object.jumping = false; object.y = curr_level.y - object.height; object.velocity_y = 0;break; } 
            }
        },

        collideBorders: function(object){

            if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
            else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
            if(object.y<0){object.y = 0; object.velocity_y = 0}
        },

        collideObject: function(object) {
          
            this.collideBorders(object);
            this.collideLevels(object);

            
        },

        update: function() {

            for(let curr_player of this.players.players){
                const draw = Math.random()  
                if(Math.abs(curr_player.velocity_x) < 0.01){
                    if(draw>0.20 && draw <0.30){curr_player.moveRight()}
                    else if (draw<0.20 && draw>0.1){curr_player.moveLeft()}
                    else if(draw<0.05) {curr_player.jump()}
                }

        
                

                curr_player.velocity_y += this.gravity

                curr_player.update();

                curr_player.velocity_x *= this.friction;
                curr_player.velocity_y *= this.friction;

                this.collideObject(curr_player);

            }



            
        }


    };

    console.log(this.world.height)

  
    this.update = function() {
    
        this.world.update();

    };
  
  };
  
  Game.prototype = {
  
    constructor : Game
  
  };

  Game.Player = function(x_start,y_start) {
    this.color = "#ff0000";
    this.height = 4;
    this.width = 4;
    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.x = x_start;
    this.y = y_start;
  }

  Game.Player.prototype = {
    constructor : Game.Player,

    jump: function(){
        if(!this.jumping) {
            this.color = "#" + Math.floor(Math.random() * 16777216).toString(16);// Change to random color

            if (this.color.length != 7) {

                this.color = this.color.slice(0, 1) + "0" + this.color.slice(1, 6);

            }

            this.jumping = true;
            this.velocity_y -=0;
        }
    
    
    
    },



    moveLeft: function() {this.velocity_x -=1},
    moveRight: function() {this.velocity_x += 1;},

    update:function() {

        this.x += this.velocity_x;
        this.y += this.velocity_y;

    }


  }

  Game.Players = function() {
    this.players = [];
    this.num_players = 0;
  }

  Game.Players.prototype = {

    constructor: Game.Players,

    newPlayer: function(x_start,y_start) {
        let new_player  = new Game.Player(x_start,y_start);
        this.players.push(new_player);
        this.num_players += 1;
    }
  }

  Game.Levels = function(game_height){
    this.levels = [];
    this.num_levels = 5;
    this.level_heights = new Array(11*16,8*16,5*16,2*16)
    for(let k = 5;k>1;k--){
        console.log(this.level_heights[k])
        this.newLevel((game_height - this.level_heights[k-2]))
    }
  }

  Game.Levels.prototype = {
    constructor:Game.Levels,

    newLevel: function(y) {
        let new_level = new Game.Level(y);
        this.levels.push(new_level)
    }
  }

  Game.Level = function(y) {
    this.y = y;
    this.x = 0;
    this.width = 128;
    this.height = 3;
  }

  Game.Level.prototype = {
    constructor:Game.Level
  }




