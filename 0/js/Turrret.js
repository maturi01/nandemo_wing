'use strict';
/*
gun
angle
startUpTime
rest
*/
game.Turrret = function (gun, angle, startUpTime, rest) {
  /*
  砲塔
  angleの方向にGunを向ける。
  */
  this.gun = gun;
  this.angle = angle;
  this.startUpTime = startUpTime; //起動までの待ち時間
  this.rest = rest; // 一発ごとの休み時間
  this.restCount = 0;
}
game.Turrret.prototype.checkFire = function() {
  //発射すべきかを示す真偽値を返す
  if (this.startUpTime > 0) {
    this.startUpTime--;
    return false;
  }
  if (this.restCount > 0) {
    this.restCount--;
    return false;
  }else{
    this.restCount = this.rest;
  }
  return true;
}
game.Turrret.prototype.update = function (x, y) {
  if (!this.checkFire()) return;
  this.gun.update(x, y, this.angle);
  this.restCount = this.rest;
}

/*
 狙い撃ちトレット
*/
game.TurrretTarget = function (gun, ship, target, startUpTime, rest) {
  game.Turrret.apply(this, [gun, 0, startUpTime, rest]);
  this.ship = ship; // 自艦
  this.target = target; // 敵艦
}
game.inheritance(game.TurrretTarget, game.Turrret);

game.TurrretTarget.prototype.update = function (x, y) {
  if (!this.checkFire()) return;
  this.gun.update(x, y, game.targetAngle(this.ship, this.target));
  this.restCount = this.rest;
}

/*
 サインカーブを描くトレット
*/
game.TurrretSin = function (gun, angle, startUpTime, rest, frequency, amplitude) {
  game.Turrret.apply(this, [gun, angle, startUpTime, rest]);
  this.amplitude = amplitude; // 揺れ幅（ラジアン）
  this.frequency = frequency; // 周波数（ラジアン）
  this.count = 0;
  this.oldAngle = this.angle;
}
game.inheritance(game.TurrretSin, game.Turrret);

game.TurrretSin.prototype.update = function (x, y) {
  if (!this.checkFire()) return;
  this.gun.update(x, y, this.angle);
  this.angle += this.amplitude * Math.sin(this.frequency * this.count - this.oldAngle);
  this.count++;
  this.restCount = this.rest;
}

/*
 回転トレット
 step 回転速度（ラジアン）
*/
game.TurrretSpin = function (gun, angle, startUpTime, rest, step) {
  game.Turrret.apply(this, [gun, angle, startUpTime, rest]);
  this.step = step;
}
game.inheritance(game.TurrretSpin, game.Turrret);

game.TurrretSpin.prototype.update = function (x, y) {
  if (!this.checkFire()) return;
  this.gun.update(x, y, this.angle);
  this.angle += this.step;
}

/*
 ランダムトレット
*/
game.TurrretRandom = function (gun, startUpTime, rest) {
  game.Turrret.apply(this, [gun, game.randomAngle(), startUpTime, rest]);
}
game.inheritance(game.TurrretRandom, game.Turrret);

game.TurrretRandom.prototype.update = function (x, y) {
  if (!this.checkFire()) return;
  this.gun.update(x, y, game.randomAngle());
}
