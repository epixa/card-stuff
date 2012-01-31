/**
 * The game room module
 *
 * Game rooms are the unique endpoints that you use to play games with a group friends.
 * The game that is currently being played within a room can be changed by the players
 * at any time, and there can be any number of players within the game room at any
 * given time (this will likely change).
 *
 * Each room also keeps track of its associated web socket namespace.
 */
(function(Room){
    var Game = cards.module('game');
    var Player = cards.module('player');

    Room.Model = cards.RealtimeModel.extend({
        name: 'Room',
        initialize: function(){
            this.set({ players: new Player.List() });
        }
    });
})(cards.module('room'));