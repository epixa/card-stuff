(function(Player){
    var Game = cards.module('game');
    var Room = cards.module('room');

    Player.Model = cards.RealtimeModel.extend({
        name: 'Player'
    });

    Player.List = Backbone.Collection.extend({
        model: Player.Model
    });
})(cards.module('player'));