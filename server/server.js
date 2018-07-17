const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const  {generateMessage} = require('./utils/message');

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

    /* 
    socket.emit('newMessage', {
        from: 'Peter',
        text: "What's going on",
        createdAt: 123
    });
    */ 
    //socket.emit from Admin text Welcome to the chat app
    /*
    socket.emit('newMessage', {
        from:'Admin',
        text:'Welcome to the chat app.'
    });
    */
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app.'));



    //socket.broadcast.emit from Admin text New user joined
    /*
    socket.broadcast.emit('newMessage', {
        from:'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    }) ;
    */
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined')) ;


    
    

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);



/*
        io.emit('newMessage', {                         //for all users, the server 'll send to all users connected to the server
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
*/
        io.emit('newMessage', generateMessage(message.from, message.text));



/*
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
*/
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