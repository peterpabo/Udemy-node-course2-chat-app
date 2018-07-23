var socket = io();  //request to the server to open up a web socket and keep that connection open.

function scrollToBottom() {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');    
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();                //includes padding
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        // console.log('Should scroll');
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function ()  {                 //socket.on('connect', () => {  //Change code otherwise, FireFox, IE would crash
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });


    // console.log('Connected to server');


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

socket.on('updateUserList', function (users) { 
    console.log('Users list', users);

    var ol = jQuery('<ol></ol>');

    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});
/*
socket.on('newEmail', function (email) {
    console.log('New email', email);
});
*/
socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('k:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });    

    jQuery('#messages').append(html);

    scrollToBottom();

    // var formattedTime = moment(message.createdAt).format('k:mm a');                //console.log('New Message', message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function(data) {
    console.log('got it!', data);                   //data => ./server/server.js    => callback('This is from the server');
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('k:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // var a  = jQuery('<a target="_blank">My current location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();                             //override default behavior          http://localhost:3000/?message=test     =>      http://localhost:3000

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        // from:   'User',
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