var socket = io();  //request to the server to open up a web socket and keep that connection open.
socket.on('connect', function ()  {                 //socket.on('connect', () => {  //Change code otherwise, FireFox, IE would crash
    console.log('Connected to server');

/*
    socket.emit('createEmail',{
        to:'test@example.com',
        text: 'This is Peter.'
    })
*/
/*
    socket.emit('createMessage', {
        from: 'Peter',
        text:'Testing Chat App'
    });
*/
    
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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function(data) {
    console.log('got it!', data);                   //data => ./server/server.js    => callback('This is from the server');
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();                             //override default behavior          http://localhost:3000/?message=test     =>      http://localhost:3000

    socket.emit('createMessage', {
        from:   'User',
        text:   jQuery('[name=message]').val()      //select inputText from index.html
    }, function() {

    });
});