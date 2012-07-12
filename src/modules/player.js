var Mongoose = require('mongoose');

var Schema = new Mongoose.Schema({
    name : { type: String, match: /[a-zA-Z0-9_\-]+/ },
    room : { type: Mongoose.Schema.ObjectId, ref: 'Room' },
    user : { type: Mongoose.Schema.ObjectId, ref: 'User' }
});

var Model = Mongoose.model('Player', Schema);


module.exports = {
    Model: Model
};


module.exports = function(App){
    return {
        Model: Model,
        SyncCollection: {
            read: function(params, callback){
                Model.find(params).run(function(error, players){
                    if (error) {
                        return callback(App.createError('FATAL', 'QUERY_ERROR', error));
                    }

                    callback(null, players);
                });
            }
        }
    };
};
