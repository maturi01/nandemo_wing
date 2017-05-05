'use strict';
/*
状態遷移を扱う
*/

game.Act = function (obj){
  this.obj = obj;
  this.list = new Array();
  this.index = 0;
}
game.Act.prototype.push = function(fun){
  this.list.push(fun);
}
game.Act.prototype.update = function () {
  if(this.list.length > 0){
    var r = this.list[this.index](this.obj);
    if(r){ this.index++; }
  }
}

/*
インデックスなど使わずに実行中にも柔軟に要素の追加ができるようにするべき
unshift
*/
