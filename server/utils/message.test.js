var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');       //message.js, without .js

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        //store res in variable
        //assert from match
        //assert text match
        //assert createdAt is number

        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});

    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        //store res in variable
        //assert from match
        //assert text match
        //assert createdAt is number

        var from = 'Andrew';
        var latitude = 39.9367117;
        var longitude = -75.1708349;
        var url = 'https://www.google.be/maps?q=39.9367117,-75.1708349'
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});

    });
});
