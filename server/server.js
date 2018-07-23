const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const  {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

/*
var server = http.createServer((req, res) => {

});
*/
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

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
    // socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app.'));            //send to 1 specific user



    //socket.broadcast.emit from Admin text New user joined
    /*
    socket.broadcast.emit('newMessage', {
        from:'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    }) ;
    */
    // socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined')) ;       //to send messages to ALL users connected to the server EXCEPT the user who's sent the message


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }

        socket.join(params.room);//for people to talk who're in the same room.
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app.'));                   //send to 1 specific user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`)) ;     //to send messages to ALL users connected to the server EXCEPT the user who's sent the message        //to() => to specifiy the room
        callback();
    });
    

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);



/*
        io.emit('newMessage', {                         //for all users, the server 'll send to all users connected to the server
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
*/
        io.emit('newMessage', generateMessage(message.from, message.text));//to send message to ALL users connected to the server.
        callback();                                     //callback('This is from the server');              //acknowledgement function will still get called, but we don't actually need, we just need to know when the server responded.



/*
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
*/
    });

    

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
        console.log('User was disconnected');
    });
})                               //register an event Listener


server.listen(port, () => {         //app.listen(port, () => {              //adding socket.io
    console.log(`Server is up on ${port}`);
});


console.log(__dirname + '/../public');
console.log(publicPath);