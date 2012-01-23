/**
 * Front controller for the application server
 *
 * Sets up the server and default routes.
 */


// Module dependencies
var express = require('express');
var connect = require('connect');

var io = require('socket.io');


// Initialize app
var app = module.exports = express.createServer().listen(3000);
var sio = io.listen(app);


var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();


// Configuration app
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'Sl18TAiM4B49g9CD1TK9oVJIyoH63Sdq', store: sessionStore }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});


// Temporary storage for rooms
// @todo Replace with a persistent storage mechanism (i.e. redis)
var rooms = {
    'cerf' : {
        game: {},
        players: {}
    },
    'babbage' : {
        game: {},
        players: {}
    },
    'lovelace' : {
        game: {},
        players: {}
    }
};

// Temporary storage for users
// @todo Replace with a persistent storage mechanism (i.e. mongodb)
var users = {
    'court' : {
        'id' : 1,
        'name' : 'Court'
    },
    'kurt' : {
        'id' : 2,
        'name' : 'Kurt'
    },
    'dan' : {
        'id' : 3,
        'name' : 'Dan'
    }
};


// When a new websocket opens, set up a session object that we can access on future calls
// through that same websocket
sio.set('authorization', function(data, accept){
    if (data.headers.cookie) {
        data.cookie = connect.utils.parseCookie(data.headers.cookie);
        data.sessionID = data.cookie['connect.sid'];
        data.sessionStore = sessionStore;
        sessionStore.get(data.sessionID, function(error, session){
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
// Since most of our functionality is handled through an open websocket rather than HTTP requests,
// we make sure to keep the session alive.
sio.sockets.on('connection', function(socket){
    var handshake = socket.handshake;

    console.log('A socket with sessionID ' + handshake.sessionID + ' connected.');

    var intervalID = setInterval(function(){
        handshake.session.reload(function(){
            handshake.session.touch().save();
        });
    }, 60 * 1000);

    socket.on('disconnect', function(){
        console.log('A socket with sessionID ' + handshake.sessionID + ' disconnected.');
        clearInterval(intervalID);
    });
});


// A catch-all to make sure the user specifies a room
app.get('/', function(request, response){
    // If we have a valid login, then persist the user's identity in session
    if (!request.session.user && request.query.auth && users[request.query.auth]) {
        request.session.user = users[request.query.auth];
    }

    if (request.session.user) {
        response.render('select_room', {rooms: rooms});
    } else {
        response.render('auth');
    }
});

// Load the game screen for the specified room
app.get('/room/:id', function(request, response){
    if (!request.session.user) {
        response.redirect('home');
        return;
    }

    response.render('room', {id: request.params.id});
});


// Some details about the server
console.log("Server listening on port %d in %s mode", app.address().port, app.settings.env);