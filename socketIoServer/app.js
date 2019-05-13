var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

// soctet.io使用nodejs中的http模块搭建服务器
app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  // emit(name,data);向客户端发送数据，data对象、字符串、函数都可以
  // emit();触发事件;  on();注册事件
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});