/**
 * Sets up the socket-io server and creates the socket event listeners
 */

var io = require('socket.io');
var connect = require('connect');

/**
 * @param App    The application state
 * @param server The underlying express-based web server
 */
module.exports = function(App, server){
    var sio = io.listen(server);

    // When a new websocket opens, set up a session object that we can access on future calls
    // through that same websocket
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

    // Express sessions will timeout if there hasn't been a new HTTP request after a certain period of time.
    // Since most of our functionality is handled through an open websocket rather than HTTP requests, we
    // make sure to keep the session alive.
    sio.sockets.on('connection', function(socket){
        var handshake = socket.handshake;

        console.log('A socket with sessionID ' + handshake.sessionID + ' connected.');

        // Every minute make sure that the session remains alive (heartbeat)
        var intervalID = setInterval(function(){
            handshake.session.reload(function(){
                handshake.session.touch().save();
            });
        }, 60 * 1000);

        socket.on('disconnect', function(){
            console.log('A socket with sessionID ' + handshake.sessionID + ' disconnected.');
            clearInterval(intervalID);
        });

        socket.on('model:sync', function(method, context, data, callback){
            console.log(method);
            console.log(context);
            console.log(data);
            callback(null, data);
        });

        socket.on('collection:sync', function(method, context, data, callback){
            console.log(method);
            console.log(context);
            console.log(data);
            callback(null, data);
        });
    });
};