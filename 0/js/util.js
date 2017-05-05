'use strict';
game.radian = function (degree) {
  return degree * Math.PI / 180;
}
game.degree = function (radian) {
  return radian * 180 / Math.PI;
}
game.hitTestRect = function (ax, ay, aw, ah, bx, by, bw, bh) {
  if (ax <= bx + bw && bx <= ax + aw && ay <= by + bh && by <= ay + ah) {
    return true;
  } else {
    return false;
  }
}
game.hitTestCircle = function (ax, ay, ar, bx, by, br) {
  if(Math.pow(ax-bx, 2) + Math.pow(ay-by, 2) <= Math.pow(ar+br, 2)){
    return true;
  } else {
    return false;
  }
}
game.outOfScreen = function (ship) {
  var ax = ship.x - ship.animation.width / 2;
  var ay = ship.y - ship.animation.height / 2;
  var aw = ship.animation.width;
  var ah = ship.animation.height;
  if (!game.hitTestRect(ax, ay, aw, ah, 0, 0, game.canvas0.width, game.canvas0.height)) { //画面外なら死亡
    ship.live = false;
  }
}
// selfからtarget方向の角度を算出する
game.targetAngle = function(ship, target){
  return Math.atan2(target.y - ship.y, target.x - ship.x);
}
//継承
game.inheritance = function (child, parent){
  //Object.createを使うのは後でメソッドがオーバーライドされた時に親のプロトタイプを破壊しないため
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}
/*
//継承サンプル
Foo = function(x){ //コンストラクタ
  this.x = x; // プロパティ
}
Foo.prototype.m = function(){ //メソッド。プロトタイプに設定する
  console.log(this.x);
}

Bar = function(x){ //Fooを継承させるオブジェクトのコンストラクタ
  Foo.call(this, x); //スーパークラスのコンストラクタを呼ばなくてはならない
}
game.inheritance(B, A); 継承

o = new Bar(2); //オブジェクト生成
*/

game.randomAngle = function(){
  return (Math.PI * 2) * Math.random();
}
