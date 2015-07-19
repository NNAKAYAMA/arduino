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
  //sp.write(1);
  socket.on('tilt', function(tilt) {
    //console.log(tilt);
    //arduinoに傾きの値を送信
    var buff = 0;
    if(tilt.beta > 20)
        buff += 1;
    if(tilt.beta < -20)
        buff += 2;
    if(tilt.gamma > 20)
        buff += 4;
    if(tilt.gamma < -20)
        buff += 8;
    sp.write(buff);
    //console.log(buff);
    //すべてのクライアントと傾きの値を共有
    //io.sockets.emit("mobileTiltUpdated",tilt);
  });
});

sp.on('data', function(input){
  //console.log(input);
});