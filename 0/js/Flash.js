'use strict';

game.Flash = function() {
  /*
  フラッシュ
  */
  game.Ship.apply(this);
  this.layer = game.TOP;
  this.alpha = 1;
}
game.inheritance(game.Flash, game.Ship);

game.Flash.prototype.draw = function(){
  if(this.alpha < 0){
    this.life = 0;
    return;
  }
  game.canvas0context.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')';
  game.canvas0context.fillRect(0, 0, game.canvas0.width, game.canvas0.height);
  this.alpha -= 0.01;
  //console.log('f');
}
