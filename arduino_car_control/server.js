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
const BACK = 6,
      FOWARD = 7,
      LEFT = 8,
      RIGHT = 9;
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
    digitalWrite(FOWARD,false);
    digitalWrite(BACK,false);
    digitalWrite(LEFT,false);
    digitalWrite(RIGHT,false);
    //前後の切り替え
    if(tilt.beta > 20)
      digitalWrite(BACK,true);

    if(tilt.beta < -20)   
      digitalWrite(FOWARD,true);
    
    // 左右の切り替え
    if(tilt.gamma > 20)
      digitalWrite(LEFT,true);

    if(tilt.gamma < -20)
      digitalWrite(RIGHT,true);
    //すべてのクライアントと傾きの値を共有
    io.sockets.emit("mobileTiltUpdated",tilt);
  });
});