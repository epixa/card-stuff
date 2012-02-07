var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name : { type: String, match: /[a-zA-Z0-9_\-]+/, unique: true },
    type : { type: mongoose.Schema.ObjectId, ref: "GameType" }
});

module.exports = mongoose.model('Room', Schema);