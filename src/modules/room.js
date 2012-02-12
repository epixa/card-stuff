var Mongoose = require('mongoose');

var Schema = new Mongoose.Schema({
    name : { type: String, match: /[a-zA-Z0-9_\-]+/, unique: true },
    game : { type: Mongoose.Schema.ObjectId, ref: 'Game' }
});

var Model = Mongoose.model('Room', Schema);


module.exports = function(App){
    return {
        Model: Model,
        SyncModel: {
            read: function(params, callback){
                Model.findOne(params).populate('game').run(function(error, room){
                    if (error) {
                        return callback(App.createError('FATAL', 'QUERY_ERROR', error));
                    } else if (!room) {
                        return callback(App.createError('FATAL', 'NOT_FOUND'));
                    }

                    callback(null, room);
                });
            }
        }
    };
};