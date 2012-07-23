var Mongoose = require('mongoose');

var Schema = new Mongoose.Schema({
    name : { type: String, match: /[a-zA-Z0-9_\-]+/, unique: true },
    type : { type: Mongoose.Schema.ObjectId, ref: "GameType" }
});

var Model = Mongoose.model('Game', Schema);

module.exports = {
    Model: Model
};
