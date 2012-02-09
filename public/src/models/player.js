define([
    'models/realtime'
], function(Realtime){
    var context = 'player';

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