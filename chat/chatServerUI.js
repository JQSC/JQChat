/**
 * Created by chi on 2017/2/16.
 */
//客户端socker.io
    window.onload=function(){
        var socket= io.connect('http://localhost');

        //更新在线人数，及其人数列表
        socket.on('addUser',function(data){
            var user=data.user,
                userNum=data.userNum,
                content=data.text

        });
        
    };