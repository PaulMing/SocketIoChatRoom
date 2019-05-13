const ws = require('nodejs-websocket');
const PORT = 3000;
let count = 0;//记录连接上来用户数量

// 创建server -> 每个连接上的用户都有自己的connect对象
const server = ws.createServer(function(connect){
    // console.log('有用户连接上来');
    count++;
    connect.userName = `用户${count}`
    // 1.告诉所有用户、有人加入了聊天室 ->广播
    broadcast(`${connect.userName}进入了聊天室`);
    connect.on('text',function(data){
        // 2.接收到某个用户的消息，告诉所有用户消息
        broadcast(data);      
    })
    connect.on('close',function(){
        console.log('连接断开');
        count--;
        // 3.告诉所有用户，有人离开了聊天室
        broadcast(`${connect.userName}离开了聊天室`);
    });
    //用户页窗口关闭时会异常
    connect.on('error',function(){
        console.log('捕获错误');
    })

})
// 广播
function broadcast(msg){
    server.connections.forEach(function(item){
        item.send(msg);
    })
}

server.listen(PORT,()=>{
    console.log('启动成功');
});