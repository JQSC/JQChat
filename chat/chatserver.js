/**
 * Created by chi on 2016/8/22.
 */
var socketio=require('socket.io'),
    io,
    userList ={},     //在线用户列表
    userNum=0;

function realTimeChat(server){

    io=socketio(server);

    console.log('chat_srvver启动成功!');

    //监听客户端连接,回调函数会传递本次连接的socket
    io.on('connection',function(socket){

        console.log('启动~————————————————————————————!');

        //登录
        socket.on('login',function(name){
            //监听客户端发送消息---新用户加入、起名字、分配头像
            userNum=addUser(socket,name);
            //给所有的客户端发送消息
            io.sockets.emit('addUser',
                {userInfo:userList[socket.id],userList:userList,userNum:userNum,text:'加入聊天室!'}
            );
        });

        //接收用户发送的消息
        socket.on('chatMessage',function(message){
            //广播消息，发送给除自己外其他用户
            sendMessage(socket,message)
        });

        //监听用户退出
        socket.on('disconnect',function() {

            //退出清除用户列表中的占位
            var userOld=deleteUser(socket);
            if(userOld){
                socket.broadcast.emit('addUser',
                    {userInfo:userOld,userList:userList,userNum:userNum,text:'离开聊天室!'}
                );
            }
        })

    })
}

function addUser(socket,name){
    var id=socket.id;
        //name='一叶知秋'+(userNum+1);
    var date=new Date(),
        time=date.toLocaleTimeString();
    userList[socket.id]={userName:name,userImg:'/images/me.jpg',time:time};
    userNum++;
    return userNum
}

function deleteUser(socket){

    if (userList.hasOwnProperty(socket.id)) {
        var userOld=userList[socket.id];
        delete userList[socket.id];
        console.log(userList)
        userNum--;
        console.log(userNum)
        return userOld
    }
    return false
}
function sendMessage(socket,message){

    socket.broadcast.emit('getMessage',message)
}
exports.listen=realTimeChat;