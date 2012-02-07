define(['models/realtime'], function(Realtime){
    return {
        Model: Realtime.Model.extend({
            _model: 'Game'
        })
    };
});