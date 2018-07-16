const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

/*
var server = http.createServer((req, res) => {

});
*/
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected'); 

/*
    socket.emit('newEmail', {
        from: 'peter@example.com',
        text: "What's going on",
        createdAt: 123
    });
    
    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });
    */
   
    socket.emit('newMessage', {
        from: 'Peter',
        text: "What's going on",
        createdAt: 123
    });
   
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
})                               //register an event Listener


server.listen(port, () => {         //app.listen(port, () => {              //adding socket.io
    console.log(`Server is up on ${port}`);
});


console.log(__dirname + '/../public');
console.log(publicPath);