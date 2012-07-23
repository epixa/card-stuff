define([
    'models/realtime'
], function(Realtime){
    var context = 'Player';

    var Model = Realtime.Model.extend({
        context: context,
        idAttribute: '_id'
    });

    var Collection = Realtime.Collection.extend({
        context: context,
        model: Model
    });

    return {
        Model: Model,
        Collection: Collection
    };
});
