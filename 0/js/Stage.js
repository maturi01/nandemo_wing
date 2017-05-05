game.Stage1 = function () {
  this.sounds = new Map();
  var audio = new Audio();
  audio.src = 'resources/bgm.mp3';
  audio.loop = true;
  this.sounds.set('bgm', audio);

  audio = new Audio();
  audio.src = 'resources/SE_Explosion.mp3';
  audio.loop = false;
  this.sounds.set('se_exp', audio);

  this.ship_maneger = new game.ShipManager();
  this.layer = new game.Layer();
  this.colisionManager = new game.ColisionManager();
  this.background = new game.Background('background.png');
  this.draw = function () {
    this.layer.update();
    this.colisionManager.update();
    this.ship_maneger.update();
    this.colisionManager.collision();
    this.background.draw();
    this.layer.draw();
  }
  this.init = function () {
    this.sounds.get('bgm').play();
    this.player = new game.Player();
    this.boss = new game.Boss1();
    game.canvas0.addEventListener('click', game.stage.click);
  }
  this.end = function(){
    this.sounds.get('bgm').pause();
    game.canvas0.removeEventListener('click', game.stage.click, false);
  }
  this.click = function (e) {
    new game.Bomb();
    new game.Flash();
    game.stage.boss.life = 0;
  }
}
