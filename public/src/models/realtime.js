/**
 * Base for all models that synchronize through socket io
 *
 * Any model extending this must specify a property called "name" which is passed along
 * to the backend to identify what type of data is being modified.
 *
 * The backend should listen for the cards.model.sync socket.io event in order to handle
 * any changes that are synchronized.
 */
define({
    Model: Backbone.Model.extend({
        getModel: function(){
            if (!this.__proto__._model) {
                throw "No model identifier configured";
            }
            return this.__proto__._model;
        },
        sync: function(method, model, options){
            // @todo emit a synchronization event to the backend
            // cards.sio.emit('cards.model.sync', model.getModelIdentifier(), model.toJSON(), method, options);
        }
    })
});