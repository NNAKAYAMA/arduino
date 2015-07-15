/*
** serverの設定
*/
var html = require('fs').readFileSync('index.html');
var http = require('http').createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(html);
});

var io = require('socket.io')(http);
http.listen(8000);

/*
** arduinoの設定
*/
//シリアルポートの設定
var sirialPort = 'COM3';
//ピン配置の設定
var pinNumber = { back : 6 ,foward : 7 ,left : 9 ,right : 10};
var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata();
arduino.connect(sirialPort);

arduino.on('connect', function(){
console.log("board version"+arduino.boardVersion);
});

/*
**アクセスが起こった時の反応
*/

io.on('connection', function(socket) {
  console.log("connected");
  socket.on('tilt', function(tilt) {
    //すべてのピンの出力をfalseに
    for (i in pinNumber)
      digitalWrite(pinNumber[i],false);
    
    //前後の切り替え
    if(dataFromClient.beta > 20)
      digitalWrite(pinNumber["back"],true);

    if(dataFromClient.beta < -20)   
      digitalWrite(pinNumber["foward"],true);
    
    // 左右の切り替え
    if(dataFromClient.gamma > 20)
      digitalWrite(pinNumber["left"],true);

    if(dataFromClient.gamma < -20)
      digitalWrite(pinNumber["right"],true);
    //すべてのクライアントと傾きの値を共有
    io.sockets.emit("shareTilt",tilt);
  });
});