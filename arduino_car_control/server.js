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

var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata();
arduino.connect('COM3');

arduino.on('connect', function(){
console.log("board version"+arduino.boardVersion);
});

/*
**アクセスが起こった時の反応
*/

io.on('connection', function(socket) {
  console.log("connected");
  socket.on('setData', function(dataFromClient) {
    
    if(dataFromClient.beta > 20){
      //後退
      setDigital(6,true,7,false);
    }
    else if(dataFromClient.beta < -20){   
      //前進
      setDigital(6,false,7,true);
    }else{
      //停止
      setDigital(6,false,7,false);
    }

    // 左右の切り替え
    if(dataFromClient.gamma > 20){
      //左折      
      setDigital(9,true,10,false);
    }else if(dataFromClient.gamma < -20){
      //右折
      setDigital(9,false,10,true);
    }else{
      //ニュートラル
      setDigital(9,false,10,false);
    }

  });
});


function setDigital(a,b,c,d){
    arduino.digitalWrite(a,b);
    arduino.digitalWrite(c,d);
}