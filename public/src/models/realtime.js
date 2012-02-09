/**
 * Base for all models that synchronize through socket io
 *
 * Any model extending this must specify a property called "name" which is passed along
 * to the backend to identify what type of data is being modified.
 *
 * The backend should listen for the cards.model.sync socket.io event in order to handle
 * any changes that are synchronized.
 */
define([
    'app'
], function(App){
    var callback = function(error, data, options){
        if (error) {
            options['error'](error);
            return;
        }

        options['success'](data);
    };

    return {
        Model: Backbone.Model.extend({
            sync: function(method, model, options) {
                var data = {};
                var context = model.context;

                if (model.isNew()) {
                    data = model.toJSON();
                } else if (model.hasChanged()) {
                    data = model.changedAttributes();
                }

                return App.socket.emit('model:sync', method, context, data, function(error, data){
                    callback(error, data, options);
                });
            }
        }),
        Collection: Backbone.Collection.extend({
            sync: function(method, collection, options) {
                var data = collection.toJSON();
                var context = collection.context;

                return App.socket.emit('collection:sync', method, context, data, function(error, data){
                    callback(error, data, options);
                });
            }
        })
    };
});