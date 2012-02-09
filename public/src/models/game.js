define([
    'models/realtime'
], function(Realtime){
    var context = 'player';

    return {
        Model: Realtime.Model.extend({
            context: context,
            idAttribute: '_id'
        })
    };
});