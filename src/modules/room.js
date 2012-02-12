var Mongoose = require('mongoose');

var Schema = new Mongoose.Schema({
    name : { type: String, match: /[a-zA-Z0-9_\-]+/, unique: true },
    game : { type: Mongoose.Schema.ObjectId, ref: 'Game' }
});

var Model = Mongoose.model('Room', Schema);


module.exports = {
    Model: Model
};