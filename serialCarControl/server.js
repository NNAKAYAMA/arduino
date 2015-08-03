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
http.listen(80);

/*
** シリアルポートの設定
*/
var serialPort = require("serialport")
var portName = 'COM3'; 
var sp = new serialPort.SerialPort(portName, {
  baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: false,
    flowControl: false
});

var BETA = 0,
    GAMMA = 0;
/*
**アクセスが起こった時の反応
*/ 
io.on('connection', function(socket) {
  console.log("connected");
  socket.on('tilt', function(tilt) {
    BETA = tilt.beta;
    GAMMA = tilt.gamma;
    
    //すべてのクライアントと傾きの値を共有
    io.sockets.emit("mobileTiltUpdated",tilt);
  });
});

//arduinoに傾きの値を送信
var send = setInterval(function() {
  var buff;
  if(BETA > 20)
    buff = '1';
  else if(BETA < -20)
    buff = '2';
  else
    buff = '0';
  sp.write(buff);
  if(GAMMA > 20)
    buff = '1';
  else if(GAMMA < -20)
    buff = '2';
  else
    buff = '0';
    sp.write(buff);
  },50);

//arduinoからデータが送れれた時
// sp.on('data', function(input) {
// });