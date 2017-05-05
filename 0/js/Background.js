'use strict';
 game.Background = function(filename) {
  this.img = new Image();
  this.img.src = 'resources/' + filename;
  this.counter = 0;
  this.draw = function () {
    if (this.counter >= 640) {
      this.counter = 0;
    } else {
      this.counter += 1;
    }
    game.canvas0context.globalCompositeOperation = 'source-over'; //default
    game.canvas0context.drawImage(this.img, 0, this.counter - 640);
    game.canvas0context.drawImage(this.img, 0, this.counter);
  }
}
