define([
    'models/realtime'
], function(Realtime){
    var context = 'Game';

    return {
        Model: Realtime.Model.extend({
            context: context,
            idAttribute: '_id'
        })
    };
});
