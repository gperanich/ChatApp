var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientPath = path.join(__dirname, '../client');

app.use(express.static(clientPath));

io.on('connection', function(socket){
    console.log('user connected');
    io.emit('user connected', 'gperanich connected');

    socket.on('chat message', function(msg){
        console.log('receiving message');
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        io.emit('user disconnected', 'user disconnected');
    });

    socket.on('user typing', function(user) {
        io.emit('user typing', user);
    });  
});

app.get('*', function(req, res, next) {
    if (isAssest(req.url)) {
        return next();
    } else {
        res.sendFile(path.join(clientPath, '/index.html'));
    }
});

http.listen(3000, function() {
    console.log('listening on port 3000');
});

function isAssest(path) {
    var pieces = path.split('/');
    if (pieces.length === 0) { return false; };
    var last = pieces[pieces.length-1];
    if (path.indexOf('/api') != -1) {
        return true;
    } else if (last.indexOf('.') != -1) {
        return true;
    } else {
        return false;
    }
};
