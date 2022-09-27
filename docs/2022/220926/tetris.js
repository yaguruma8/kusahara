'use strict';

//描画キャンバス・コンテキストの取得
var canvas = document.getElementById('drawcanvas');
var ctx = canvas.getContext('2d');

var BLOCK_SIZE = 20;//ブロックサイズpx

var width = (10 + 2) * BLOCK_SIZE;
var height = (20 + 1) * BLOCK_SIZE;
var dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
ctx.scale(dpr, dpr);
canvas.style.width = width + 'px';
canvas.style.height = height + 'px';

//ロードが終了してからmyGameを実行
window.onload = function(){
  myGame();
}

function myGame(){
//ここからゲームプログラム

  var x = 5;//横
  var y = 1;//縦
  var r = 0;//回転
  var moveX = 0; //横移動量
  var moveY = 0; //縦移動量
  var moveR = 0; //回転量
  var dropCount = 0;//落下カウント
  var dropSpeed = 20;//落下速度
  var mainlooptimer = 0;  //メインループ用のタイマー
  var board = [];  //０：空白、１〜７：テトリミノ、８：壁
  var minoNum = 1; //テトリミノの種類（１〜７）
  var rMino = [0,0,0,0,0,0]; //回転後のテトリミノの相対位置
  var fillLines = []; //埋まっている列番号の配列
  var clearLineTotal = 0; //消した列の合計
  var isgameFlag = true;
  var gameoverFlag = false;
  var continueFlag = false;

  var MINOS = [    //０〜５：最初にセットした時の相対位置、６：回転可能数
     [],                           //0:空白（使用しない）
     [1,0,-1,0,0,-1, 4], //1:T
     [-1,0,-2,0,1,0, 2],  //2:I
     [1,0,-1,0,-1,-1, 4],  //3:J
     [1,0,-1,0,1,-1, 4], //4:L
     [1,0,0,-1,-1,-1, 4],  //5:Z
     [-1,0,0,-1,1,-1, 4], //6:S
     [1,0,1,-1,0,-1, 1]  //7:O
  ];

  var MINOS_COLOR = ['','orchid', 'lightskyblue', 'royalblue', 'orange', 'crimson', 'seagreen', 'gold'];
    //対応したミノの色 0は空白（使用しない）

  setBoard();
  drawStage();
  mainloop();

  function mainloop(){
    if (board[(1*12)+5] !== 0 ){ //ゲームオーバーフラグ
      gameoverFlag = true;
    }

    clearMino();//ミノの消去

    //-----左右と回転
    x = x + moveX;
    r = r + moveR;
    //重なってたら戻す
    if( moveCheck() ){ //重なっていたら
      x = x - moveX;//位置を戻す
      r = r - moveR;
    }
    moveX = 0;//移動量を戻す
    moveR = 0;

    //-----落下
    dropCount = dropCount + 1;//自然落下のカウント
    if(dropCount > dropSpeed ){
      moveY = 1;
      dropCount = 0;
    }
    y = y + moveY;//自然落下orソフトドロップ

    //重なっていたら戻して積もる（消す、詰める、リセット）
    if( moveCheck() ){//重なっていたら
      y = y - moveY;//位置を戻す
      lockMino();//ミノを固定して（board配列に書き込む）
      drawStage();//ステージを再描画
      fillLines = lineCheck();//埋まっている列のチェック
      if( fillLines.length ){ //埋まっている列が存在する時
        shiftLines();  //詰めて
        drawStage();  //ステージを再描画
      }
      //ミノの位置をリセット
      x = 5;
      y = 1;
      r = 0;
      minoNum = Math.floor( Math.random() * 7 ) + 1;
    }
    moveY = 0;//移動量を戻す

    drawMino();//ミノの描画

    mainlooptimer = requestAnimationFrame(mainloop);

    if(gameoverFlag){//ゲームオーバーフラグが立っていたら、gameoverへ
      isgameFlag = false;
      gameover();
    }

  }

  function gameover(){ //ゲームオーバー
    cancelAnimationFrame(mainlooptimer);  //mainloopのタイマーを止める
    setTimeout(function(){ //止めてから200ms後に実行する
      lockMino();
      var i = 0;
      while(i < 12 * 21){ //全てのブロックをグレーにする
        var x, y;
        x = i % 12;
        y = (i - x ) / 12;
        if (board[i] !== 0 && board[i] !== 8){
          drawBlock(x, y, 'darkgray');
        }
        i  = i + 1;
      }
      //ゲームオーバー、continue Press Enter key のテキストを表示する（エンターキーで再開）
      continueFlag = true;
    }, 200);
  }


  //キー取得
  window.addEventListener('keydown', keyControl );
  function keyControl(e){
    console.log(e.code +'  ' +  e.keyCode);
    if(e.keyCode === 39){//右に動く
      if(isgameFlag){
        moveX = 1;
      }
    }
    if(e.keyCode === 37){//左に動く
      if(isgameFlag){
        moveX = -1;
      }
    }
    if(e.keyCode === 38){//上：回転する
      if(isgameFlag){
        moveR = 1;
      }
    }
    if(e.keyCode === 40){//下：ソフトドロップ
      if(isgameFlag){
        moveY = 1;
      }
    }
    // if(e.keyCode === 32){//スペースキー：ゲームオーバーの時は押せばゲーム再開
    // 	if(gameoverFlag ===true){
    // 		myGame();
    // 	}
    // }
    if(e.keyCode === 13){//エンターキー：ゲームオーバーの時、押すと新規ゲーム
      if(continueFlag){
        gameoverFlag = false;
        continueFlag = false;
        isgameFlag = true;
        myGame();
      }
    }

  }

  //ここからゲーム用関数

  function setBoard(){//最初orリトライ時。boardを一度まっさらにしてから底と壁のフラグを立てる
    var i;
    i = 0;
    while(i < 12 * 21){ //横10マス＋両端、縦20+底
      board[i] = 0;
      i = i + 1;
    }
    //底
    i = 0;
    while( i < 12){
      board[(12 * 20) + i] = 8;
      i = i + 1;
    }
    //壁
    i = 0;
    while( i < 20){
      board[(12 * i) + 0] = 8;
      board[(12 * i) + 11] = 8;
      i = i + 1;
    }
  }

  function drawStage(){ //ステージの描画。壁＋底＋すでに落ちて積まれているブロックの描画
    ctx.clearRect(0, 0, width * dpr, height * dpr);//キャンバス全体から描画を消去
    var i = 0;
    while(i < 12 * 21){
      var x, y;
      x = i % 12;
      y = (i - x ) / 12;
      if (board[i] === 8){ //8（壁と底）の描画
        drawBlock(x, y, 'darkgray');
      }
      if (board[i] !== 0 && board[i] !== 8){ //１〜７（すでに落ちているブロック）の描画
        drawBlock(x, y, MINOS_COLOR[board[i]]);
      }
      i  = i + 1;
    }
  }

  function otherMinoPosition(){//代表ブロック以外のブロックの位置を計算してrMino配列に相対位置を入れる
    rMino= [];
    var temp, rotateTimes;
    var i, j;
    i = 0;
    while( i < 6){
      rMino[i] = MINOS[minoNum][i];
      i = i + 1;
    }
    rotateTimes = r % MINOS[minoNum][6];
    i = 0;
    while( i < rotateTimes ){
      j = 0;
      while( j < 3){
        temp = rMino[2*j];
        rMino[2*j] = rMino[(2*j)+1] * -1;
        rMino[(2*j)+1] = temp;
        j = j + 1;
      }
      i = i + 1;
    }
  }

  function lockMino(){	//テトリミノを固定してboardに書き込む
    board[(y * 12) + x] = minoNum;
    board[(12 * (y + rMino[1])) + (x + rMino[0])] = minoNum;
    board[(12 * (y + rMino[3])) + (x + rMino[2])] = minoNum;
    board[(12 * (y + rMino[5])) + (x + rMino[4])] = minoNum;

  }

  function moveCheck(){ //動けるかチェック（checkが0の時だけ動ける）
    otherMinoPosition();
    var check = board[(12 * y) + x];
    check = check + board[(12 * (y + rMino[1])) + (x + rMino[0])];
    check = check + board[(12 * (y + rMino[3])) + (x + rMino[2])];
    check = check + board[(12 * (y + rMino[5])) + (x + rMino[4])];
    return check;
  }

  function lineCheck(){ //揃っている列を確認する
    var fillLineNum =[];
    var x, y, check;
    y = 0;//上から順番に調べる
    while(y < 20){
      check = true;
      x = 1;
      while(x < 11){
        if( board[(y * 12) + x] === 0 ){ //一つでも0（空白）があればcheckはfalseになる
          check = false;
        }
        x = x + 1;
      }
      if(check){
        fillLineNum.push(y); //埋まっている列番号を配列に入れる
      }
      y = y + 1;
    }
    return fillLineNum;
  }

  function clearLines(){ //埋まっている列のboardを0にする：：未使用
    var i = 0;
    while(i < fillLines.length ){
      var x = 1;
      while(x < 11){
        board[(12 * fillLines[i] ) + x] = 0;
        x = x + 1;
      }
      i = i + 1;
    }
  }

  function shiftLines(){  //埋まっている列を削除して詰め、上に空白の列を入れる
    var i = 0;
    while(i < fillLines.length){
      board.splice((fillLines[i] * 12), 12);
      board.splice(0,0,8,0,0,0,0,0,0,0,0,0,0,8);
      i = i + 1;
    }
  }


  function drawMino(){ //テトリミノの描画
    otherMinoPosition();
    var color = MINOS_COLOR[minoNum];
    drawBlock(x, y, color);
    drawBlock(x + rMino[0], y + rMino[1], color);
    drawBlock(x + rMino[2], y + rMino[3], color);
    drawBlock(x + rMino[4], y + rMino[5], color);

  }

  function clearMino(){ //テトリミノの描画（アニメーションのために消す）
    clearBlock(x, y);
    clearBlock(x + rMino[0], y + rMino[1]);
    clearBlock(x + rMino[2], y + rMino[3]);
    clearBlock(x + rMino[4], y + rMino[5]);

  }

  function drawBlock(x, y, color){ //ブロックの描画
    var x, y, color;
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
  }

  function clearBlock(x, y){ //ブロックの消去
    var x, y;
    ctx.clearRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
  }

  //ここまで関数

//ここまでゲームプログラム
}
