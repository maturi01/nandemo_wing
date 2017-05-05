'use strict';
game.Colision = function Colision() {
  /*
衝突判定を一手に担う
通常弾に比べて被弾対象の方が少ない。軽量化のために弾と被弾対象は分けて登録する。
*/
  this.checkList = new Array();
  this.XList = new Array(canvas0.width); //X軸ピクセルのリスト
  for (var i = 0, len = this.XList.length; i < len; i++) {
    this.XList[i] = new Array();
  }
  this.update = function () {
    this.checkList.length = 0; //空にする
    for (var i = 0, len = this.XList.length; i < len; i++) {
      this.XList[i].length = 0;
    }
  }
  this.putBullet = function (ship) {
    for (var i = Math.round(ship.x - ship.radius); i < Math.round(ship.x + ship.radius); i++) {
      if (i >= 0 && i < this.XList.length) {
        this.XList[i].push(ship);
      }
    }
  }
  this.putCheck = function (ship) {
    this.checkList.push(ship);
  }
  this.collision = function () {
    for (var i = 0, len = this.checkList.length; i < len; i++) {
      var shipA = this.checkList[i];
      var left = Math.round(shipA.x - shipA.radius);
      var right = Math.round(shipA.x + shipA.radius);
      if (left < 0) left = 0;
      if (right > this.XList.length) right = this.XList.length;
      var collidedList = [
      ];
      for (var j = left; j < right; j++) {
        this.XList[j].forEach(function (shipB, i, a) {
          if (collidedList.includes(shipB)) {
            //衝突済みのオブジェクトとは衝突させない
            return;
          }
          if (shipB && shipA.layer_collision == shipB.layer) {
            var hit = game.hitTestCircle(shipA.x, shipA.y, shipA.radius, shipB.x, shipB.y, shipB.radius);
            if (hit) {
              shipA.collided(shipB);
              shipB.collided(shipA);
              collidedList.push(shipB);
            }
          }
        });
      }
    }
  }
}
game.ColisionManager = function () {
  /*
  プレイヤーと敵を分けて管理する
  */
  this.collisionPlayer = new game.Colision();
  this.collisionEnemy = new game.Colision();
}
game.ColisionManager.prototype.update = function () {
  this.collisionPlayer.update();
  this.collisionEnemy.update();
}
game.ColisionManager.prototype.put = function(ship) {
  switch (ship.layer) {
    case game.PLAYER:
      this.collisionPlayer.putCheck(ship);
      break;
    case game.PLAYR_BULLET:
      this.collisionEnemy.putBullet(ship);
      break;
    case game.ENEMY:
      this.collisionEnemy.putCheck(ship);
      break;
    case game.ENYMY_BULLET:
      this.collisionPlayer.putBullet(ship);
      break;
    default:
      throw new Error('衝突判定不能なオブジェクトです');
  }
}
game.ColisionManager.prototype.collision = function () {
  this.collisionPlayer.collision();
  this.collisionEnemy.collision();
}
