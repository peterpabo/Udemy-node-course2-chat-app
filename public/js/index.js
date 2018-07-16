var socket = io();  //request to the server to open up a web socket and keep that connection open.
socket.on('connect', function ()  {                 //socket.on('connect', () => {  //Change code otherwise, FireFox, IE would crash
    console.log('Connected to server');

/*
    socket.emit('createEmail',{
        to:'test@example.com',
        text: 'This is Peter.'
    })
*/
    socket.emit('createMessage', {
        from: 'Peter',
        text:'Testing Chat App'
    });

    
});

socket.on('disconnect', function () {               //socket.on('disconnect', () => {  //Change code otherwise, FireFox, IE would crash
    console.log('Disconnected from server');
});
/*
socket.on('newEmail', function (email) {
    console.log('New email', email);
});
*/
socket.on('newMessage', function (message) {
    console.log('New Message', message);
});