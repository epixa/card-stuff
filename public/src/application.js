/**
 * A namespace for all cards functionality
 */
var cards = {
    sio: null,
    players: {},
    game: null,

    /**
     * Base for all models that synchronize through socket io
     *
     * Any model extending this must specify a property called "name" which is passed along
     * to the backend to identify what type of data is being modified.
     *
     * The backend should listen for the cards.model.sync socket.io event in order to handle
     * any changes that are synchronized.
     */
    RealtimeModel: Backbone.Model.extend({
        getName: function(){
            if (!this.__proto__.name) {
                throw "No model name configured";
            }
            return this.__proto__.name;
        },
        sync: function(method, model, options){
            cards.sio.emit('cards.model.sync', model.getName(), model.toJSON(), method, options);
        }
    }),

    /**
     * Retrieves a module by a given name:
     *
     * Usage: cards.module('game')
     */
    module: (function(){
        var modules = {};

        return function(name) {
            if (!modules[name]) {
                modules[name] = {
                    Views: {}
                };
            }

            return modules[name];
        };
    })(),

    /**
     * Runs the cards application
     */
    run: function(sio){
        cards.sio = sio;
        var Model = this.module('room').Model;
        var entity = new Model;
        entity.save({name : 'test1'});
        // Load the current game state
        // Load the current player information
        // Determine which player the current user is
    }
};