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


// Configuration app
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});


everyone.now.joinGame = function(gameId){
    this.user.game = gameId;
    nowjs.getGroup(this.user.game).addUser(this.user.clientId);
    console.log(this.user.clientId + ' joined game ' + this.user.game);
};

everyone.on('leave', function(){
    console.log(this.user.clientId + ' left game ' + this.user.game);
});


// A catch-all to make sure the user specifies a game
app.get('/', function(request, response){
    response.render('nogame');
});

// Load the game screen for the specified game
app.get('/game/:id', function(request, response){
    response.render('game', {id: request.params.id});
});


// Some details about the server
console.log("Server listening on port %d in %s mode", app.address().port, app.settings.env);