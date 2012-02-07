define(['models/player'], function(Player){
    return Backbone.Collection.extend({
        model: Player.Model
    });
});