game.Ship = function (){
  /*
  Shipに分類されるオブジェクトの基準
  */
  this.live = true;
  this.layer = game.SYSTEM;
  this.layer_collision = game.SYSTEM;
  this.x = 0;
  this.y = 0;
  this.angle = 0; //進行角度
  this.speed = 0;
  this.move = new game.MoveNOP(this);
  this.radius = 0; //衝突範囲を示す半径
  this.animation = new game.Animation(10, 10, ['resources/Dummy.png']);
  this.collision = false; //衝突判定する
  this.life = 1; //0の場合は回収される
  this.damage = 0; //衝突時に相手に与えられる
  this.turretList = [];
  this.act = new game.Act(this);
  game.stage.ship_maneger.put(this);
}
game.Ship.prototype.update = function () {
    this.act.update();
    if (this.life <= 0) { //ライフがゼロ以下なら死亡
      this.live = false;
      return;
    }
    game.outOfScreen(this);
    this.move.update();
    game.stage.layer.put(this.layer, this);
    if(this.collision) game.stage.colisionManager.put(this);
    for (var i = 0, len = this.turretList.length; i < len; i++) {
      this.turretList[i].update(this.x, this.y);
    }
  }
game.Ship.prototype.draw = function () {
  this.animation.draw(this);
}
game.Ship.prototype.collided = function (ship) {
    if (!this.collision) return;
    this.life -= ship.damage;
}

game.ShipManager = function () {
  //登録したshipが死亡したら開放する
  this.sl_old = new Array();
  this.sl = new Array();
  this.put = function (ship) {
    this.sl.push(ship);
  }
  this.update = function () {
    this.sl_old = this.sl;
    this.sl = new Array();
    for (var i = 0; i < this.sl_old.length; i++) {
      var ship = this.sl_old[i];
      ship.update();
      if (ship.live) this.sl.push(ship);
    }
  }
}
