'use strict';

game.Explosion = function(x, y, angle, speed) {
  /*
  爆発
  */
  game.Ship.apply(this);
  this.layer = game.SYSTEM;
  this.x = x;
  this.y = y;
  this.angle = angle; //進行角度
  this.speed = 20;
  this.move = new game.MoveAngle(this);
  //this.radius = 0; //衝突範囲を示す半径
  this.animation = new game.AnimationOneWay(100, 100,[
    'resources/Explosion_0000.png',
    'resources/Explosion_0001.png',
    'resources/Explosion_0002.png',
    'resources/Explosion_0003.png',
    'resources/Explosion_0004.png',
    'resources/Explosion_0005.png',
    'resources/Explosion_0006.png',
    'resources/Explosion_0007.png',
  ]);
  this.act.push(function(o){
    if(o.animation.end){
      o.life = 0;
    }
  });
  game.stage.sounds.get('se_exp').play();
}
game.inheritance(game.Explosion, game.Ship);

game.ExplosionBoss = function(x, y, angle, speed){
  game.Explosion.call(this, x, y, angle, speed);
  this.layer = game.ENEMY;
}
game.inheritance(game.ExplosionBoss, game.Explosion);

game.ExplosionPlayer = function(x, y, angle, speed){
  game.Explosion.call(this, x, y, angle, speed);
  this.layer = game.PLAYER;
}
game.inheritance(game.ExplosionPlayer, game.Explosion);
