
var socket = io.connect('http://localhost:3000');
var username,avatar;

// 登录功能
$('#login_avatar li').on('click',function(){
    $(this).addClass('now').siblings().removeClass('now');
})

$('#loginBtn').on('click',function(){
    // 获取用户名
    var username = $('#username').val().trim();
    if(!username){
        alert('请输入用户名');
        return
    }
    // 获取选择的头像
    var avatar = $('#login_avatar li.now img').attr('src');
    // 发送数据
    socket.emit('login',{
        username: username,
        avatar: avatar
    });
})


socket.on('loginError',data =>{
    alert('登录失败 - 用户已存在');
})
// 用户登录
socket.on('loginSuccess',data =>{
    // alert('登录成功');
    $('.login_box').fadeOut();
    $('.container').fadeIn();
    // 设置个人信息
    $('.avatar_url').attr('src',data.avatar);
    $('.user-list .username').text(data.username)

    username = data.username;
    avatar = data.avatar;
})

// 监听添加用户的消息 - 系统消息
socket.on('addUser',data => {
    // 添加系统消息
    $('.box-bd').append(`
        <div class="system">
            <p class="message_system">
                <span class="content">${data.username}加入了群聊</span>
            </p>
        </div>
    `)
    scrollIntoView();
})
// 监听用户列表
socket.on('userList',data => {
    $('.user-list ul').html('');
    data.forEach(item => {
        $('.user-list ul').append(`
            <li class="user">
                <div class="avatar"><img src="${item.avatar}" alt=""/></div>
                <div class="name">${item.username}</div>
            </li>
        `)
    })  
    $('#userCount').text(data.length);
})

// 监听用户离开消息
socket.on('delUser',data => {
    // 添加系统消息
    $('.box-bd').append(`
        <div class="system">
            <p class="message_system">
                <span class="content">${data.username}离开了群聊</span>
            </p>
        </div>
    `)
    scrollIntoView();
})




// 聊天功能
$('.btn-send').on('click',()=>{
    var content = $('#content').html();
    $('#content').html('');
    if(!content) return alert('请输入内容');

    socket.emit('sendMessage',{
        msg: content,
        username: username,
        avatar: avatar,
    });
})

// 监听聊天消息
socket.on('receiveMessage',data=>{
    // 把接收到的消息显示到聊天窗口
    if(data.username == username){
        $('.box-bd').append(`
            <div class="message-box">
            <div class="my message">
                <img class="avatar" src="${data.avatar}" alt="" />
                <div class="content">
                <div class="bubble">
                    <div class="bubble_cont">${data.msg}</div>
                </div>
                </div>
            </div>
            </div>
        `)
    }else{
        $('.box-bd').append(`
            <div class="message-box">
                <div class="other message">
                <img class="avatar" src="${data.avatar}" alt="" />
                <div class="content">
                    <div class="nickname">${data.username}</div>
                    <div class="bubble">
                    <div class="bubble_cont">${data.msg}</div>
                    </div>
                </div>
                </div>
            </div>
        `)
    }
    // 滚动条滚动到最后的位置ele.scrollIntoView(false);
    // $('.box-bd').children(':last').get(0).scrollIntoView(false);
    scrollIntoView();
})

// 滚动条滚到底部
function scrollIntoView(){
    $('.box-bd').children(':last').get(0).scrollIntoView(false);
}



// 发送图片功能
$('#file').on('change',function(){
    var file = this.files[0];
    var fr = new FileReader();
    fr.readAsDataURL(flie);//转换为base64编码
    fr.onload = function(){
        socket.emit('sendImage',{
            username: username,
            avatar,avatar,
            img: fr.result
        })
    }
})

// 监听图片聊天信息
socket.on('receiveImage',data=>{
    // 把接收到的消息显示到聊天窗口
    if(data.username == username){
        $('.box-bd').append(`
            <div class="message-box">
            <div class="my message">
                <img class="avatar" src="${data.avatar}" alt="" />
                <div class="content">
                <div class="bubble">
                    <div class="bubble_cont">
                    <img src="${data.img}">
                    </div>
                </div>
                </div>
            </div>
            </div>
        `)
    }else{
        $('.box-bd').append(`
            <div class="message-box">
                <div class="other message">
                <img class="avatar" src="${data.avatar}" alt="" />
                <div class="content">
                    <div class="nickname">${data.username}</div>
                    <div class="bubble">
                    <div class="bubble_cont">
                        <img src="${data.img}">
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `)
    }
    // 等待图片加载完成
    $('.box-bd img:last').on('load',function(){
        scrollIntoView();
    }) 
})

// 表情功能
$('.face').on('click', function() {
    $('#content').emoji({
      // 设置触发表情的按钮
      button: '.face',
      showTab: false,
      animation: 'slide',
      position: 'topRight',
      icons: [
        {
          name: 'QQ表情',
          path: 'lib/jquery-emoji/img/qq/',
          maxNum: 91,
          excludeNums: [41, 45, 54],
          file: '.gif'
        }
      ]
    })
  })