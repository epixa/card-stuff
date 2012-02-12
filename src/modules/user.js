var Mongoose = require('mongoose');

var Schema = new Mongoose.Schema({
    username : { type: String, match: /[a-zA-Z0-9_\-]+/, unique: true }
});

var Model = Mongoose.model('User', Schema);


module.exports = {
    Model: Model
};