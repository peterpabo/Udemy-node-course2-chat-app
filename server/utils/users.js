[{
    id:     '/fskdfjame',
    name:   'Peter',
    room:   'The Office Fans'
}]

//  addUser(id, name, room)
//  removeUser(id)
//  getUser(id)
//  getUserList(room)

class Users{
    constructor(){
        this.users = [];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
    }
    removeUser(id){
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        } 
        return user;        
    }
    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room){
/*
    var users = this.users.filter((user) => {
        return user.room === room;
    })
    var namesArray = users.map((user) => {
        return user.name
    });
*/       
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = {Users};
/*
//  not ES6!!!

var users = [];

var addUser = (id, name, room) => {
    users.push({})
}

modules.export = {addUsers};
*/


/*
//ES6 exp
class Person{                       //Uppercase convention

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getUserDescription (){
        return `${this.name} is ${this.age} year(s) old.`;
    }
}   

var me = new Person('Peter', 30);
var description = me.getUserDescription();
console.log(description);
*/

