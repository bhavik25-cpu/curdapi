const uuid = require('uuid');

class User {
  constructor(username, age, hobbies) {
    this.id = uuid.v4();
    this.username = username;
    this.age = age;
    this.hobbies = hobbies || [];
  }
}

module.exports = User;
