'use strict';
var game ={
  /*
  このソフトウェアのトップレベルの名前空間オブジェクト。
  最終的にgame.init()を呼び出すことによって処理を始める。
  */
  gameStop: false,
  mouseX: 0,
  mouseY: 0,
  canvas0: document.getElementById('canvas0'),
  hit: 0, //被弾数
  mousemove: function (e) {
    game.mouseX = e.pageX - game.canvas0.offsetLeft;
    game.mouseY = e.pageY - game.canvas0.offsetTop;
  },
  mouseover: function () {
    game.gameStop = false;
  },
  mouseout: function () {
    game.gameStop = true;
  },
  canvas0context: canvas0.getContext('2d'),
  init: function () {
    this.hit = 0;
    game.canvas0.style.cursor = 'none';
    //game.canvas0.addEventListener('mousemove', game.mousemove);
    game.canvas0.addEventListener('mouseover', game.mouseover);
    game.canvas0.addEventListener('mouseout', game.mouseout);

    game.stage = new game.Stage1();
    game.stage.init();
    game.timer = setInterval('game.draw()', 1000 / 60);
    new game.Flash();
  },
  draw: function () {
    if (game.gameStop) return;
    //game.canvas0context.fillStyle = '#000000';
    //game.canvas0context.fillRect(0, 0, game.canvas0.width, game.canvas0.height);
    game.stage.draw();
    game.canvas0context.font = '18px selif';
    game.canvas0context.fillStyle = '#000000';
    game.canvas0context.fillText(game.hit, 0, 18);
  },
  end: function(){
    this.stage.end();
    clearInterval(game.timer);
    this.canvas0.removeEventListener('mouseover', game.mouseover, false);
    this.canvas0.removeEventListener('mouseout', game.mouseout, false);
    end.init();
  }
}
/*
スタート画面
*/
var start = {
  img: new Image(),
  canvas0: document.getElementById('canvas0'),
  canvas0context: canvas0.getContext('2d'),
  init: function(){
    this.canvas0.style.cursor = 'default';
    start.timer = setInterval('start.draw()', 1000 / 60);
    game.canvas0.addEventListener('mousemove', game.mousemove);
    this.canvas0.addEventListener('click', start.click);
    this.img.src = 'resources/start.png';
  },
  end: function(){
    clearInterval(start.timer);
    this.canvas0.removeEventListener('click', start.click, false);
  },
  draw: function(){
    this.canvas0context.drawImage(this.img, 0, 0);
  },
  click: function(){
    start.end();
    game.init();
  }
}

/*
エンド画面
*/
var end = {
  img: new Image(),
  canvas0: document.getElementById('canvas0'),
  canvas0context: canvas0.getContext('2d'),
  init: function(){
    this.canvas0.style.cursor = 'default';
    this.canvas0.addEventListener('click', end.click);
    end.timer = setInterval('end.draw()', 1000 / 60);
  },
  end: function(){
    clearInterval(end.timer);
    this.canvas0.removeEventListener('click', end.click, false);
  },
  draw: function(){
    this.canvas0context.fillStyle = '#000000';
    this.canvas0context.fillRect(0, 0, canvas0.width, canvas0.height);
    this.canvas0context.fillStyle = '#ffffff';
    this.canvas0context.font = '60px selif';
    this.canvas0context.textAlign = 'center';
    this.canvas0context.fillText('GAME OVER', canvas0.width/2, canvas0.height/2);
  },
  click: function(){
    end.end();
    start.init();
  }
}
