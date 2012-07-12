/**
 * The game room module
 *
 * Game rooms are the unique endpoints that you use to play games with a group
 * friends. The game that is currently being played within a room can be
 * changed by the players at any time, and there can be any number of players
 * within the game room at any given time (this will likely change).
 *
 * Each room also keeps track of its associated web socket namespace.
 */
define([
    'app',
    'models/realtime',
    'models/player'
], function(App, Realtime, Player){
    var context = 'Room';

    var Model = Realtime.Model.extend({
        context: context,
        idAttribute: '_id',
        players: new Player.Collection()
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
