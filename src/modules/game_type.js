var Mongoose = require('mongoose');

var Schema = new Mongoose.Schema({
    name : { type: String, match: /[a-zA-Z0-9_\-]+/, unique: true }
});

var Model = Mongoose.model('GameType', Schema);


module.exports = {
    Model: Model
};