'use strict';
game.Player = function () {
  /*
  プレイヤー
  */
  game.Ship.call(this);
  this.layer = game.PLAYER;
  this.layer_collision = game.ENYMY_BULLET;
  this.move = new game.MoveMoouse(this);
  this.radius = 1; //衝突範囲を示す半径
  this.animation = new game.Animation(200, 200, ['resources/Player.png']);
  this.collision = true; //衝突判定する
  this.life = 1; //0の場合は回収される
  this.damage = 1; //衝突時に相手に与えられる
  this.hit_flg = false; //衝突フラグ

  this.act.push(function(o){ //直線
      var b = new game.GunBullet(game.PlayerBullet);
      var t = new game.TurrretTarget(b, o, game.stage.boss, 0, 1);
      o.turretList.push(t);
    return true;
  });
  this.act.push(function(o){});
}

game.inheritance(game.Player, game.Ship);

game.Player.prototype.update = function () {
  game.Ship.prototype.update.call(this);
  this.hit_flg = false;
}
game.Player.prototype.collided = function (ship) {
    if (!this.collision) return;
    //プレイヤーはダメージを受けない
    if(!this.hit_flg){ // 1フレームに一度だけ発生する
      game.hit++; //被弾数を記録
      new game.Bomb();
      new game.ExplosionPlayer(this.x, this.y, game.randomAngle(), 10);
      this.hit_flg = true;
    }
}

game.PlayerBullet = function(x, y, angle) {
  /*
  プレイヤー弾
  */
  game.Ship.apply(this);
  this.layer = game.PLAYR_BULLET;
  this.layer_collision = game.ENEMY;
  this.x = x;
  this.y = y;
  this.angle = angle; //進行角度
  this.speed = 10;
  this.move = new game.MoveAngle(this);
  this.radius = 60; //衝突範囲を示す半径
  this.animation = new game.Animation(40, 40, ['resources/PlayerBullet.png']);
  //this.animation.blend = 'lighter';
  this.collision = true; //衝突判定する
  this.life = 1; //0の場合は回収される
  this.damage = 1; //衝突時に相手に与えられる

  this.act.push(function(o){
    if(o.life <= 0){
      //new game.Explosion(o.x, o.y, o.layer);
    }
  });
}
game.inheritance(game.PlayerBullet, game.Ship);

game.Bomb = function () {
  /*
  ボム
  */
  game.Ship.call(this);
  this.layer = game.PLAYER;
  this.layer_collision = game.ENYMY_BULLET;
  this.x = game.canvas0.width/2;
  this.y = game.canvas0.height/2;
  this.move = new game.MoveNOP(this);
  this.radius = 1000; //衝突範囲を示す半径
  //this.animation = new game.Animation('resources/Player.png');
  this.collision = true; //衝突判定する
  this.life = 1; //0の場合は回収される
  this.damage = 1; //衝突時に相手に与えられる
}
game.inheritance(game.Bomb, game.Ship);
