
技术栈：WebSocket协议(H5)、nodejs-websocket模块、Socket.io库、FileReader、jQuery、jQuery-emoji(表情插件)；  


项目目录介绍：  
websocketServer：项目基于nodejs-websocket模块搭建服务器，实现简版聊天室；  
socketIoServer：项目基于Socket.io库，该库基于nodejs服务,第一版使用nodejs中的http模块搭建服务器；  
socketIoServer1: Socket.io库+Express框架+jquery库及插件实现类似“微信聊天窗口”的聊天室，丰富了上传文件/图片、发送表情等实用聊天功能；  



项目思路：伪代码 -> 实现第一版 ->后续优化；  
优化：滚动条滚动到聊天最后的位置API:ele.scrollIntoView(false);  
难点：难点：前后端通信逻辑(SocketIo库的API使用还是很便捷的)；  
注意：jquery表情插件在textarea中使用其会直接发送文本形式 -> 解决方案，使用div即可，添加H5属性contenteditable = 'true';  


URL管理：  
nodejs-websocket模块：https://github.com/sitegui/nodejs-websocket  
socket.io库：https://socket.io/docs/  
jQuery-emoji(表情插件)：http://www.jq22.com/yanshi6363  



