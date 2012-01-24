var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    username : { type: String, match: /[a-zA-Z0-9_\-]+/, unique: true }
});

module.exports = mongoose.model('User', Schema);