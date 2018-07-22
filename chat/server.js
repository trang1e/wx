let express=require('express');
let app=express();
let http=require('http').Server(app);
let io=require('socket.io')(http);
let path=require('path');


let onlineCount=0;
app.use(express.static(__dirname));

app.get('/login.html',function(req,res){
   res.sendFile('login.html');
});

io.on('connection',function(socket)
{
    console.log('a user connected');

    io.emit('connected',++onlineCount);


    socket.on('disconnect',function(){
        console.log('user disconnected');
        io.emit('disconnected',--onlineCount);
        console.log(onlineCount);
    });
    socket.on('message',function(message){
       io.emit('message',message);
    });
});

let server=http.listen(4000,function(){
    console.log('Server is running');
});
