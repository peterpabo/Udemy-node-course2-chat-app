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
    var formattedTime = moment(message.createdAt).format('k:mm a');                //console.log('New Message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function(data) {
    console.log('got it!', data);                   //data => ./server/server.js    => callback('This is from the server');
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('k:mm a');
    var li = jQuery('<li></li>');
    var a  = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();                             //override default behavior          http://localhost:3000/?message=test     =>      http://localhost:3000

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from:   'User',
        text:   messageTextbox.val()      //select inputText from index.html
    }, function() {
        messageTextbox.val('')
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');                        //disable-key, disable-value the locationButton till the process is occuring.

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Sending location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Sending location');
        alert('Unable to fetch location.');
    });
});