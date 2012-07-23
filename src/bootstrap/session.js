/**
 * Sets up the session storage and session middleware
 *
 * The name of the session storage adapter as well as the secret salt for
 * session keys is retrieved from the App configuration.
 */

var express = require('express');

/**
 * @param App    The application state
 * @param server The underlying express-based web server
 */
module.exports = function(App, server){
    var SessionStorage = express.session[App.Config.Session.Store.adapter];
    App.sessionStorage = new SessionStorage();

    server.configure(function(){
        server.use(express.session({ secret: App.Config.Session.secret, store: App.sessionStorage }));
    });
};
