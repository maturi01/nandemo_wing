'use strict';
game.Boss1 = function() {
  /*
  ボス。
  ステージ全体の進行役も担う。
  */
  game.Ship.apply(this);
  this.layer = game.ENEMY;
  this.layer_collision = game.PLAYR_BULLET;
  this.x = game.canvas0.width/2;
  this.y = 150;
  this.angle = Math.PI * 1.5; //進行角度
  this.speed = (Math.PI*2/(60*5));
  this.move = new game.MoveCurve(this, 50, 20);
  this.radius = 50; //衝突範囲を示す半径
  this.animation = new game.Animation(200, 200, ['resources/Boss.png']);
  this.collision = true; //衝突判定する
  this.life = 100; //0の場合は回収される
  this.damage = 1; //衝突時に相手に与えられる
  this._setAct();
}
game.inheritance(game.Boss1, game.Ship);

//Actを設定（長いので関数に分割）
game.Boss1.prototype._setAct = function(){
  this.act.push(function(o){ //
    if(o.life <= 0){
      o.life = 300;
      o.turretList.length = 0;
      var b = new game.GunBullet(game.BossBulletSpin);
      var t = new game.Turrret(b, game.radian(30), 30, 2);
      o.turretList.push(t);
      return true;
    }
  });
  this.act.push(function(o){ //奇数弾
    if(o.life <= 0){
      o.life = 100;
      o.turretList.length = 0;
      var b = new game.GunBullet(game.BossBullet);
      var g = new game.GunOdd(b, game.radian(20), 2);
      var t = new game.Turrret(g, game.radian(90), 30, 1);
      o.turretList.push(t);
      return true;
    }
  });
  this.act.push(function(o){ //偶数弾
    if(o.life <= 0){
      o.life = 300;
      o.turretList.length = 0;
      var b = new game.GunBullet(game.BossBullet);
      var t = new game.TurrretTarget(b, o, game.stage.player, 30, 1);
      o.turretList.push(t);
      var b = new game.GunBullet(game.BossBullet);
      var g = new game.GunEven(b, game.radian(30), 4);
      var t = new game.Turrret(g, game.radian(90), 30, 1);
      o.turretList.push(t);
      return true;
    }
  });
  this.act.push(function(o){ //
    if(o.life <= 0){
      o.life = 400;
      o.turretList.length = 0;
      var b = new game.GunBullet(game.BossBulletTarget);
      var t = new game.Turrret(b, game.radian(180), 30, 1);
      o.turretList.push(t);
      return true;
    }
  });
  this.act.push(function(o){ //ランダム
    if(o.life <= 0){
      o.life = 200;
      o.turretList.length = 0;
      var b = new game.GunBullet(game.BossBullet);
      var g = new game.GunEven(b, game.radian(20), 2);
      var t = new game.TurrretRandom(g, 30, 1);
      o.turretList.push(t);
      return true;
    }
  });
  this.act.push(function(o){ //回転
    if(o.life <= 0){
      o.life = 200;
      o.turretList.length = 0;
      var b = new game.GunBullet(game.BossBullet);
      var g = new game.GunEven(b, game.radian(20), 3);
      var t = new game.TurrretSpin(g, game.radian(90), 30, 1, game.radian(1));
      o.turretList.push(t);
      return true;
    }
  });
  this.act.push(function(o){
    if(o.life <= 0){
      o.life = 600;
      o.turretList.length = 0;
      var gun = new game.GunBullet(game.BossBullet);
      gun = new game.GunCircle(gun, 2);
      gun = new game.GunEven(gun, game.radian(30), 4);
      gun = new game.GunOdd(gun, game.radian(10), 3);
      var t1 = new game.Turrret(gun, o.angle, 60, 2);
      var t2 = new game.TurrretSin(gun, o.angle, 30, 8, game.radian(0.5), game.radian(1));
      o.turretList.push(t1);
      o.turretList.push(t2);
      return true;
    }
  });
  this.act.push(function(o){
    if(o.life <= 0){
      o.life = 1;
      o.collision = false;
      o.turretList.length = 0;
      o.move = new game.MoveNOP();
      new game.Bomb();

      var gun = new game.GunBullet(game.ExplosionBoss);
      gun = new game.GunOdd(gun, game.radian(1), 3);
      gun = new game.GunCircle(gun, 10);
      var t1 = new game.Turrret(gun, o.angle, 0, 4);
      o.turretList.push(t1);
      o.count = 0;
      return true;
    }
  });
  this.act.push(function(o){
    o.life = 1;
    if(o.count > 180){
      o.count = 0;
      new game.Flash();
      o.animation = new game.Animation(10, 10, ['resources/Dummy.png']);
      o.turretList.length = 0;
      return true;
    }
    o.count++;
  });
  this.act.push(function(o){
    o.life = 1;
    if(o.count > 180){
      game.end();
    }
    o.count++;
  });
}

game.BossBullet = function(x, y, angle) {
  /*
  ボス弾
  */
  game.Ship.apply(this);
  this.layer = game.ENYMY_BULLET;
  this.layer_collision = game.PLAYER;
  this.x = x;
  this.y = y;
  this.angle = angle; //進行角度
  this.speed = 5;
  this.move = new game.MoveAngle(this);
  this.radius = 5; //衝突範囲を示す半径
  this.animation = new game.Animation(20, 20, ['resources/BossBullet.png']);
  this.collision = true; //衝突判定する
  this.life = 1; //0の場合は回収される
  this.damage = 1; //衝突時に相手に与えられる
}
game.inheritance(game.BossBullet, game.Ship);

game.BossBulletTarget = function(x, y, angle) {
  /*
  ボス弾
  */
  game.Ship.apply(this);
  this.layer = game.ENYMY_BULLET;
  this.layer_collision = game.PLAYER;
  this.x = x;
  this.y = y;
  this.angle = angle; //進行角度
  this.speed = 5;
  this.move = new game.MoveAngle(this);
  this.radius = 5; //衝突範囲を示す半径
  this.animation = new game.Animation(20, 20, ['resources/BossBullet.png']);
  this.collision = true; //衝突判定する
  this.life = 1; //0の場合は回収される
  this.damage = 1; //衝突時に相手に与えられる
  var b = new game.GunBullet(game.BossBullet);
  var g = new game.GunOdd(b, game.radian(20), 1);
  var t = new game.TurrretTarget(g, this, game.stage.player, 30, 1);
  this.turretList.push(t);
}
game.inheritance(game.BossBulletTarget, game.Ship);

game.BossBulletSpin = function(x, y, angle) {
  /*
  ボス弾
  */
  game.Ship.apply(this);
  this.layer = game.ENYMY_BULLET;
  this.layer_collision = game.PLAYER;
  this.x = x;
  this.y = y;
  this.angle = angle; //進行角度
  this.speed = 5;
  this.move = new game.MoveAngle(this);
  this.radius = 1; //衝突範囲を示す半径
  this.animation = new game.Animation(20, 20, ['resources/BossBullet.png']);
  this.collision = true; //衝突判定する
  this.life = 1; //0の場合は回収される
  this.damage = 1; //衝突時に相手に与えられる
  var b = new game.GunBullet(game.BossBullet);
  var g = new game.GunOdd(b, game.radian(20), 1);
  var t = new game.TurrretSpin(g, game.radian(90), 0, 0, game.radian(16));
  this.turretList.push(t);
}
game.inheritance(game.BossBulletSpin, game.Ship);

/*
game.BossBulletRabbit = function(x, y, angle) {
  //
  //ボス弾
  //
  game.Ship.apply(this);
  this.layer = game.ENYMY_BULLET;
  this.layer_collision = game.PLAYER;
  this.x = x;
  this.y = y;
  this.angle = angle; //進行角度
  this.speed = 2;
  this.move = new game.MoveAngle(this);
  this.radius = 5; //衝突範囲を示す半径
  this.animation = new game.Animation(20, 20, ['resources/BossBullet.png']);
  this.collision = true; //衝突判定する
  this.life = 1; //0の場合は回収される
  this.damage = 1; //衝突時に相手に与えられる

  this.act.push(function(o){
    var b = new game.GunBullet(game.BossBulletRabbit);
    var t = new game.TurrretRandom(b, 10, 8);
    o.turretList.push(t);
    var b = new game.GunBullet(game.PlayerFox);
    var t = new game.TurrretRandom(b, 14, 64);
    o.turretList.push(t);
  });
}
game.inheritance(game.BossBulletRabbit, game.Ship);

game.PlayerFox = function(x, y, angle) {
  //
  //ボス弾
  //
  game.Ship.apply(this);
  this.layer = game.PLAYER;
  this.layer_collision = game.ENYMY_BULLET;
  this.x = x;
  this.y = y;
  this.angle = angle; //進行角度
  this.speed = 4;
  this.move = new game.MoveAngle(this);
  this.radius = 5; //衝突範囲を示す半径
  this.animation = new game.Animation(10, 10, ['resources/Dummy.png']);
  this.animation.blend = 'lighter';
  this.collision = false; //衝突判定する
  this.life = 1000; //0の場合は回収される
  this.damage = 1; //衝突時に相手に与えられる
  this.act.push(function(o){
    o.collision = true;
  });
}
game.inheritance(game.PlayerFox, game.Ship);
*/
