var moment = require('moment');

//Jan 1st 1970 00:00:00 am

// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());

// var date = moment();
// date.add(1, 'year').subtract(5, 'months');
// console.log(date.format('MMM Do, YYYY'));


var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('k:mm a'));                 //10:35 am