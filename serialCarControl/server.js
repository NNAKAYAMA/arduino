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
** シリアルポートの設定
*/
var SerialPort = require("serialport").SerialPort
var portName = 'COM3'; 
var sp = new SerialPort(portName, {
  baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: true
});

/*
**アクセスが起こった時の反応
*/
io.on('connection', function(socket) {
  console.log("connected");
  socket.on('tilt', function(tilt) {
    //console.log(tilt);
    //arduinoに傾きの値を送信
    sp.write(tilt.beta);
    sp.write(tilt.gamma);

    //すべてのクライアントと傾きの値を共有
    //io.sockets.emit("mobileTiltUpdated",tilt);
  });
});

//arduinoからデータが送れれた時
sp.on('data', function(input){
  //console.log(input);
});