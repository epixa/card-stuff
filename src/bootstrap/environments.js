/**
 * Bootstrapping method for configuring specific environments
 */

var express = require('express');

/**
 * @param App    The application state
 * @param server The underlying express-based web server
 */
module.exports = function(App, server){
    server.configure(function(){
        server.use(express.bodyParser());
        server.use(express.cookieParser());
        server.use(express.static(App.ROOT_PATH + '/public'));
    });

    server.configure('production', function(){
        App.Config = App.require('config/production');

        server.use(express.errorHandler());
    });

    server.configure('development', function(){
        App.Config = App.require('config/development');

        server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });
};