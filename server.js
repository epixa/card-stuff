/**
 * Front controller for the express web server
 *
 * Sets up and starts the web server and initiates the application bootstrap
 */


// Initialize server
var express = require('express');
var port = process.argv[2] > 0 ? process.argv[2] : 3000;
var server = express.createServer().listen(port);

// Bootstrap the application
require('./src/app').bootstrap(server, __dirname);

console.log("Server listening on port %d in %s mode", server.address().port, server.settings.env);
