var request = require('request'); // request 
trim = require('trim'), // 트림 임포트 
    // web server
    express = require('express'),
    http = require('http'),
    log = require('color-log'), // 칼라로그    
    readline = require('readline');
app = express(),
server = http.createServer(app).listen(process.env.PORT || 3000, function() {
        log.warn('서버 start');
    }),
    bodyParser = require('body-parser'),
    io = require('socket.io').listen(server); // 실시간 통신을 위한 socket.io


log.warn('start launch  ');
// express setting(form parser)
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.set('views', './view'); // view 디렉토리 설정 
//app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

/* GET home page. */
app.get('/', function(req, res) {
    res.sendfile('./view/index.html');
});

app.get('/a.wav', function(req, res) {
    res.download('./view/a.wav');
});


/* sensor 상태 수신  */
app.get('/sensor', function(req, res) {

    var s = req.query.s; 

    console.log(s);



    if (mSocket) {
        console.log("socket is open");
        if(s == 'fire'){
            console.log(s);
            mSocket.emit('alarm-check', {
                msg: "fire-on",
                result: 'ok'
            });
        }else if(s == 'fall'){
            console.log(s);
            mSocket.emit('alarm-check', {
                msg: "falling-on",
                result: 'ok'
            });
        }else if(s == 'emerg'){
            console.log(s);
            mSocket.emit('alarm-check', {
                msg: "emerg-on",
                result: 'ok'
            });
        }
    }

    res.end('ok');

});

/**
 * 아두이노 데이터를 수신할  웹서버 구동 
 * @return {[type]} [description]
 */
var mSocket = null;
(function startServer() {
    // sokect.io 통신으로 연결 
    io.sockets.on('connection', function(socket) {
        console.log("connection");
        mSocket = socket;
    });

    io.sockets.on('disconnect', function(socket) {
        console.log("disconnect");
        //mSocket = null;
    });

    /**
     * 웹 서버 구동 시작
     */


})();
