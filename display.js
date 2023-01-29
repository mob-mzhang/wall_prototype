// Frank Poth 02/28/2018

/* This Display class contains the screen resize event handler and also handles
drawing colors to the buffer and then to the display. */

const Display = function(canvas) {

    this.buffer  = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");
  

    this.tile_sheet = new Display.TileSheet(16,22);
    this.player_sheet = new Display.TileSheet(16,4);
    
    this.drawMap = function(map, columns) {

        for (let index = map.length - 1; index > -1; -- index) {
    
          let value = map[index] ;
          let source_x =           (value % this.tile_sheet.columns) * this.tile_sheet.tile_size;
          let source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_size;
          let destination_x =           (index % columns) * this.tile_sheet.tile_size;
          let destination_y = Math.floor(index / columns) * this.tile_sheet.tile_size;
          this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size, destination_x, destination_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size);
    
        }
    
      };

    this.drawPlayers = (players) => {
        
        for(let curr_player of players.players){
            let value = curr_player.animator.frame_value
            let source_x =           (value % curr_player.animator.sprite_sheet.columns) * this.tile_sheet.tile_size;
            let source_y = Math.floor(value / curr_player.animator.sprite_sheet.columns) * this.tile_sheet.tile_size;
            let destination_x = Math.floor(curr_player.x)
            let destination_y = curr_player.y

          console.log(value)

            this.buffer.drawImage(this.player_sheet.image, source_x, source_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size, destination_x, destination_y-20, this.tile_sheet.tile_size, this.tile_sheet.tile_size);
        }
        

       
    }

    this.drawLevels = (levels) => {
        for(let curr_level of levels.levels){

            this.buffer.fillStyle = '#ffffff';
            this.buffer.fillRect(curr_level.x, Math.floor(curr_level.y), curr_level.width , curr_level.height);
        }
    }
      
    
  
    this.resize = function(width, height, height_width_ratio) {

        if (height / width > height_width_ratio) {
    
          this.context.canvas.height = width * height_width_ratio;
          this.context.canvas.width = width;
    
        } else {
    
          this.context.canvas.height = height;
          this.context.canvas.width = height / height_width_ratio;
    
        }
    
        this.context.imageSmoothingEnabled = false;
    
    };
  

  
  };
  
  Display.prototype = {
  
    constructor : Display,
    render:function() { this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); },
  
  };

  Display.TileSheet = function(tile_size, columns) {
    this.image = new Image();
    this.tile_size = tile_size;
    this.columns = columns
  }


  Display.TileSheet.prototype = {};