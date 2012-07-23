/**
 * Sets up the socket-io server and creates the socket event listeners
 *
 * We use socket-io to handle all application communication between the front
 * and back ends after a user loads the game room page.
 */

var io = require('socket.io');
var connect = require('connect');
var util = require('underscore');

/**
 * @param App    The application state
 * @param server The underlying express-based web server
 */
module.exports = function(App, server){
    var sio = io.listen(server);

    /**
     * Handles the initial authorization when a client attempts to start a
     * connection
     *
     * When a new websocket opens, we set up a session object that we can
     * access on future calls through that same websocket.
     *
     * If a session is not set, we error.  Otherwise, we store that session
     * information so that we can access it on future socket-io events.
     */
    sio.set('authorization', function(data, accept){
        if (data.headers.cookie) {
            data.cookie = connect.utils.parseCookie(data.headers.cookie);
            data.sessionID = data.cookie['connect.sid'];
            data.sessionStore = App.sessionStorage;
            data.sessionStore.get(data.sessionID, function(error, session){
                if (error || !session) {
                    accept('Failed to read session information', false);
                } else {
                    data.session = new connect.middleware.session.Session(data, session);
                    accept(null, true);
                }
            });
        } else {
            return accept('No cookie transmitted.', false);
        }
    });

    /**
     * Handles the initial connection for a client
     *
     * Express sessions will timeout if there hasn't been a new HTTP request
     * after a certain period of time. Since most of our functionality is
     * handled through an open websocket rather than HTTP requests, we make
     * sure to keep sessions alive so long as the socket connection exists.
     *
     * This event occurs after the authorization event returns successfully.
     */
    sio.sockets.on('connection', function(socket){
        var handshake = socket.handshake;

        console.log('A socket with sessionID ' + handshake.sessionID + ' connected.');

        // Every minute make sure that the session remains alive (heartbeat)
        var intervalID = setInterval(function(){
            handshake.session.reload(function(){
                handshake.session.touch().save();
            });
        }, 60 * 1000);

        /**
         * Handles the disconnect event for the current socket.
         *
         * When the client disconnects from this socket (leaves the page), we
         * stop the session heartbeat.
         */
        socket.on('disconnect', function(){
            console.log('A socket with sessionID ' + handshake.sessionID + ' disconnected.');
            clearInterval(intervalID);
        });

        /**
         * Handles the model synchronization event for the current socket.
         *
         * Frontend data for specific models is saved to or retrieved from the
         * backend through this socket by triggering this event.  We make sure
         * the given sync method is defined for the given model.
         *
         * SyncModel functions are defined by individual modules.
         */
        socket.on('model:sync', function(method, context, data, callback){
            if (util.isUndefined(App.Modules[context])) {
                return callback(App.createError('FATAL', 'INVALID_ARG', context + ' is not a valid context'));
            }

            if (util.isUndefined(App.Modules[context].SyncModel[method])) {
                return callback(App.createError('FATAL', 'INVALID_ARG', method + ' is not a valid sync method'));
            }

            App.Modules[context].SyncModel[method](data, callback);
        });

        socket.on('collection:sync', function(method, context, data, callback){
            if (util.isUndefined(App.Modules[context])) {
                return callback(App.createError('FATAL', 'INVALID_ARG', context + ' is not a valid context'));
            }

            if (util.isUndefined(App.Modules[context].SyncCollection[method])) {
                return callback(App.createError('FATAL', 'INVALID_ARG', method + ' is not a valid sync method'));
            }

            App.Modules[context].SyncCollection[method](data, callback);
        });
    });
};
