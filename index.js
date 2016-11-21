var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientPath = path.join(__dirname, '/');

app.use(express.static(clientPath));

io.on('connection', function(socket){
    console.log('user connected');
    socket.on('chat message', function(msg){
        console.log('receiving message');
        io.emit('chat message', msg);
    });

    // socket.on('disconnect', function() {
    //     console.log('user disconnected');
    // });  
});


http.listen(3000, function() {
    console.log('listening on port 3000');
});