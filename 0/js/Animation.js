'use strict';
game.Animation = function (width, height, fl) {
  if(fl.length == 0){
    //fl = ['resources/Dummy.png'];
  }
  this.il = [];
  this.i = 0;
  this.blend = 'source-over';
  for(var i=0, len=fl.length; i < len; i++){
    var img = new Image();
    img.src = fl[i];
    this.il.push(img);
  }
  this.width = width; //見た目の幅（衝突判定で使う）
  this.height = height; //見た目の高さ（衝突判定で使う）
}
game.Animation.prototype.draw = function (ship) {
  //game.canvas0context.globalCompositeOperation = 'source-over'; //default
  game.canvas0context.globalCompositeOperation = this.blend;
  if(this.i >= this.il.length){
    this.i = 0;
  }
  var img = this.il[this.i];
  //console.log(this.i);
  game.canvas0context.drawImage(img, ship.x - (this.width / 2), ship.y - (this.height / 2));
  this.i++;
}

/*
アニメーション　片道
*/
game.AnimationOneWay = function(width, height, fl){
  game.Animation.call(this, width, height, fl);
  this.end = false; //アニメーション終了
}
game.inheritance(game.AnimationOneWay, game.Animation);

game.AnimationOneWay.prototype.draw = function(ship){
  game.canvas0context.globalCompositeOperation = this.blend;
  if(this.i >= this.il.length){
    this.i = this.il.length - 1;
    this.end = true;

  }
  var img = this.il[this.i];
  game.canvas0context.drawImage(img, ship.x - (this.width / 2), ship.y - (this.height / 2));
  this.i++;
}
