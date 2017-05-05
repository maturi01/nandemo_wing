'use strict';
game.SYSTEM = 0;
game.PLAYER = 3;
game.PLAYR_BULLET = 2;
game.ENEMY = 1;
game.ENYMY_BULLET = 4;
game.TOP = 5;

game.Layer = function () {
  //shipの階層を管理する
  this.layerList = new Array();
  for (var i = 0; i < 6; i++) {
    this.layerList.push(new Array());
  };
  this.put = function (index, ship) {
    this.layerList[index].push(ship);
  };
  this.get = function (index) {
    return this.layerList[index];
  }
  this.update = function () {
    this.layerList.forEach(function (a) {
      a.length = 0;
    });
  }
  this.draw = function () {
    this.layerList.forEach(function (layer) {
      layer.forEach(function (ship) {
        ship.draw();
      })
    });
  }
}
