var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name : { type: String, match: /[a-zA-Z0-9_\-]+/, unique: true },
    game : { type: mongoose.Schema.Types.Mixed },
    players : { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('Room', Schema);