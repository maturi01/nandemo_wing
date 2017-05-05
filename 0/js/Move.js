'use strict';
game.Move = function (ship) {
}
game.Move.prototype.update = function () {
}
game.MoveNOP = game.Move;
game.MoveAngle = function (ship) {
  game.Move.apply(this);
  this.ship = ship;
}
game.MoveAngle.prototype = Object.create(game.Move.prototype);
game.MoveAngle.prototype.constructor = game.MoveAngle;
game.MoveAngle.prototype.update = function () {
  this.ship.x += Math.cos(this.ship.angle) * this.ship.speed;
  this.ship.y += Math.sin(this.ship.angle) * this.ship.speed;
}
game.MoveTarget = function (ship, target) {
  game.Move.apply(this);
  this.ship = ship;
  this.target = target;
  this.angle = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
}
game.MoveTarget.prototype = Object.create(game.Move.prototype);
game.MoveTarget.prototype.constructor = game.MoveTarget;
game.MoveTarget.prototype.update = function () {
  this.ship.x += Math.cos(this.ship.angle) * this.ship.speed;
  this.ship.y += Math.sin(this.ship.angle) * this.ship.speed;
}
game.MoveMoouse = function (ship) {
  game.Move.apply(this);
  this.ship = ship;
}
game.MoveMoouse.prototype = Object.create(game.Move.prototype);
game.MoveMoouse.prototype.constructor = game.MoveMoouse;
game.MoveMoouse.prototype.update = function () {
  game.Move.apply(this);
  this.ship.x = game.mouseX;
  this.ship.y = game.mouseY;
}
game.MoveCurve = function (ship, amplitudeX, amplitudeY) {
  game.Move.apply(this);
  this.ship = ship;
  this.baseX = this.ship.x;
  this.baseY = this.ship.y;
  this.radian = 0;
  this.amplitudeX = amplitudeX;
  this.amplitudeY = amplitudeY;
}
game.MoveCurve.prototype = Object.create(game.Move.prototype);
game.MoveCurve.prototype.constructor = game.MoveCurve;
game.MoveCurve.prototype.update = function () {
  var xAmount = this.amplitudeX * Math.cos(this.radian);
  var yAmount = this.amplitudeY * Math.sin(this.radian);
  this.ship.x = this.baseX + xAmount;
  this.ship.y = this.baseY + yAmount;
  this.radian += this.ship.speed;
}
