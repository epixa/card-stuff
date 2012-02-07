define(['models/realtime'], function(Realtime){
    var Model = Realtime.Model.extend({
        _model: 'Player'
    });

    var Collection = Backbone.Collection.extend({
        model: Model
    });

    return {
        Model: Model,
        Collection: Collection
    };
});