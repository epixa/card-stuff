/**
 * Sets up the backend view engine middleware
 *
 * @param App    The application state
 * @param server The underlying express-based web server
 */
module.exports = function(App, server){
    server.configure(function(){
        server.set('views', App.ROOT_PATH + '/views');
        server.set('view engine', 'ejs');
    });
};