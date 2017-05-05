'use strict';
game.GunBullet = function (bulletGenerator) {
  // bulletGeneratorはBulletのコンストラクタ等 (x, y angle, speed)
  this.bulletGenerator = bulletGenerator;
  this.update = function (x, y, angle) {
    new bulletGenerator(x, y, angle);
  }
}
game.GunEven = function (gun, inc_angle, step) {
  this.gun = gun;
  this.inc_angle = inc_angle;
  this.step = step;
  this.update = function (x, y, angle, speed) {
    var a1 = angle;
    var a2 = angle;
    for (var i = 0; i < this.step; i++) {
      a1 += this.inc_angle;
      a2 -= this.inc_angle;
      this.gun.update(x, y, a1);
      this.gun.update(x, y, a2);
    }
  }
}
game.GunOdd = function (gun, inc_angle, step) {
  this.gun = gun;
  this.inc_angle = inc_angle;
  this.step = step;
  this.update = function (x, y, angle, speed) {
    var a1 = angle;
    var a2 = angle;
    if (this.step > 0) this.gun.update(x, y, angle);
    for (var i = 1; i < this.step; i++) {
      a1 += this.inc_angle;
      a2 -= this.inc_angle;
      this.gun.update(x, y, a1);
      this.gun.update(x, y, a2);
    }
  }
}
game.GunCircle = function (gun, step) {
  this.gun = gun;
  this.step = step;
  this.update = function (x, y, angle) {
    if (step <= 0) return;
    for (var i = 0; i < (Math.PI * 2); i += (Math.PI * 2) / this.step) {
      this.gun.update(x, y, angle + i);
    }
  }
}
