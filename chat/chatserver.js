/**
 * Created by chi on 2016/8/22.
 */
var socketio=require('socket.io')
var io
var onlineCount =0 ;   //在线人数
var onlineUsers ={} ; //在线用户列表
exports.listen=function(server){
    io=socketio.listen(server)
    console.log('chat_srvver启动成功!')

  io.sockets.on('connection',function(socket){
   console.log('启动~————————————————————————————!')
    //监听新用户加入
    socket.on('login',function(obj){
        onlineCount++
        //存储新用户ID
        //client.name=obj.name ;
        //client.socket=socket.id ;
        onlineUsers[socket.id]=obj.name ;

        console.log(onlineCount+"++++++++++++++++++++++++++++++++")
        console.log(onlineUsers)
        //新用户加入 ，更新在线人数，及其用户列表
        socket.emit('chatNum',{
            chatNum:onlineCount,
            chatList:onlineUsers
        });


        /* 广播
         向所有的连接触发事件，这里注意：不包括本身连接的事件*/
        socket.broadcast.emit('NewUser', {
            text: '加入聊天室',
            chatNum:onlineCount,
            user:onlineUsers[socket.id],
            chatList:onlineUsers
        });

    })


    //监听用户退出
    socket.on('disconnect',function(){
        //退出清除用户列表中的占位
        if(onlineUsers.hasOwnProperty(socket.id)) {
            onlineCount--
            var name=onlineUsers[socket.id]
            delete onlineUsers[socket.id]
        }

        socket.emit('chatNum',{chatNum:onlineCount});
        //用户退出进行广播
        // console.log(obj.name+"______________________")
        socket.broadcast.emit('NewUser', {
            text: '退出聊天室',
            chatNum:onlineCount,
            user: name,
            chatList:onlineUsers
        });
    });

    //监听用户发送消息
    socket.on('message',function(message){
        socket.broadcast.emit('SendMessage',{
            text:message.text,
            name:message.name

        })
    })

});

}

