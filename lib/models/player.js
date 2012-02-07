var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name : { type: String, match: /[a-zA-Z0-9_\-]+/, unique: true },
    room : { type: mongoose.Schema.ObjectId, ref: 'Room' },
    user : { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Player', Schema);