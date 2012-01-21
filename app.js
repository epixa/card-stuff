/**
 * Front controller for the application server
 *
 * Sets up the server and default routes.
 */


// Module dependencies
var express = require('express');
var nowjs = require('now');


// Initialize app
var app = module.exports = express.createServer().listen(3000);
var everyone = nowjs.initialize(app);

var MemoryStore = require('express/node_modules/connect/lib/middleware/session/memory');
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


// Temporary storage for tables
// @todo Replace with a persistent storage mechanism (i.e. redis)
var tables = {
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


/**
 * Adds the user associated with the current client to the given table
 *
 * If a callback is specified, it is executed upon completion.
 *
 * @param tableId
 * @param callback
 */
everyone.now.join = function(tableId, callback){
    var self = this;
    sessionStore.get(decodeURIComponent(this.user.cookie['connect.sid']), function(err, session){
        if (!tables[tableId]) {
            self.now.error('That table does not exist');
            return;
        }

        if (!session) {
            self.now.error('You do not have a session!');
            return;
        }

        if (!session.user) {
            self.now.error('You must be logged in to interact with a game');
            return;
        }

        // make sure the current client is added to the group
        var group = nowjs.getGroup(tableId);
        group.addUser(self.user.clientId);

        // If the user wasn't already playing, then add them to the table and let the group know
        if (!tables[tableId].players[session.user.id]) {
            tables[tableId].players[session.user.id] = session.user;
            group.now.playerJoined(session.user);
        }

        if (callback) {
            callback();
        }
    });
};

/**
 * Removes the user associated with the current client from the given table.
 *
 * If a callback is specified, it is executed upon completion.
 *
 * @param tableId
 * @param callback OPTIONAL
 */
everyone.now.leave = function(tableId, callback){
    var self = this;
    sessionStore.get(decodeURIComponent(this.user.cookie['connect.sid']), function(err, session){
        if (!tables[tableId]) {
            self.now.error('That table does not exist');
            return;
        }

        if (!session) {
            self.now.error('You do not have a session!');
            return;
        }

        if (!session.user) {
            self.now.error('You must be logged in to interact with a game');
            return;
        }

        // Remove the client from the group
        var group = nowjs.getGroup(tableId);
        group.removeUser(self.user.clientId);

        // If the user was actually a player, then remove them from the game and notify the remaining players
        if (tables[tableId].players[session.user.id]) {
            delete tables[tableId].players[session.user.id];
            group.now.playerLeft(session.user);
        }

        if (callback) {
            callback();
        }
    });
};


// A catch-all to make sure the user specifies a table and logs in
app.get('/', function(request, response){
    // If valid login, then
    if (!request.session.user && request.query.auth && users[request.query.auth]) {
        request.session.user = users[request.query.auth];
    }

    if (request.session.user) {
        response.render('choose_table', {tables: tables});
    } else {
        response.render('auth');
    }
});

// Load the table screen for the specified table
app.get('/table/:id', function(request, response){
    if (!request.session.user) {
        response.redirect('home');
        return;
    }

    // Overcome a weird issue where session is not retrievable from the sessionStore right away
    // @todo figure out why this apparent bug is happening
    sessionStore.set(request.sessionID, request.session, function(){
        response.render('table', {id: request.params.id});
    });
});


// Some details about the server
console.log("Server listening on port %d in %s mode", app.address().port, app.settings.env);