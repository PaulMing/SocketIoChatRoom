var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const users = [];//记录所有登录用户

server.listen(3000,function(){
    console.log('服务启动');
});

app.use(require('express').static('public'));

app.get('/', function (req, res) {
  res.redirect('/index.html');//重定向
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
  socket.on('login',data =>{
    // 判断用户是否存在
    let user = users.find(item => item.username === data.username);
    if(user){
      socket.emit('loginError',{msg: '登录失败'})
    }else{
      users.push(data);
      socket.emit('loginSuccess',data);
      // 广播消息io.emit();
      io.emit('addUser',data);
      io.emit('userList',users);

      socket.username = data.username;
      socket.avatar = data.avatar;
    }
  })
  // 用户断开连接的功能 - disconnect事件为系统事件
  socket.on('disconnect',()=>{
    // 1.用户信息删除；2.有人离开了~ 3.列表删除
    let index = users.findIndex(item => item.username === socket.username);
    users.splice(index,1);
    io.emit('delUser',{
      username: socket.username,
      avatar: socket.avatar
    });
    io.emit('userList',users);
  });


  // 监听聊天的消息
  socket.on('sendMessage',data=>{
    // 广播
    io.emit('receiveMessage',data);
  })

  // 接收图片信息
  socket.on('sendImage',data=>{
    // 广播
    io.emit('receiveImage',data);
  })
});