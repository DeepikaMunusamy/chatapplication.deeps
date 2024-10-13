var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);

app.get("/", function(req, res){ 
    res.render("page");
    console.log("Home page rendered");
});


app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('A user connected');
    socket.emit('message', { message: 'Welcome to the Real Time Web Chat' });

    socket.on('send', function (data) {
        console.log('Message received: ', data);
        io.sockets.emit('message', data);
    });

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
});

server.listen(3001, function(){
    console.log("Server is running on port 3001");
});