/**
 * Sets up all of the application routes
 *
 * @param App    The application state
 * @param server The underlying express-based web server
 */
module.exports = function(App, server){
    // A catch-all to make sure the user specifies a room or logs in
    server.get('/', function(request, response){
        if (request.session.user) {
            App.Modules.Room.Model.find({}, function(error, rooms){
                if (error) {
                    console.error('Failed to retrieve rooms: ' + error);
                } else {
                    response.render('select_room', {rooms: rooms});
                }
            });
        } else {
            response.render('auth');
        }
    });

    // Handle authentication attempts
    server.post('/', function(request, response){
        var username = request.body.auth;

        if (request.session.user || !username) {
            response.redirect('home');
            return;
        }

        App.Modules.User.Model.findOne({ username: username }, function(error, user){
            if (error) {
                console.error('Failed to retrieve user information: ' + error);
            } else if (!user) {
                console.info('No user found with that username: ' + username);
            } else {
                console.info('User successfully logged in: ' + username);
                request.session.user = user;
            }

            response.redirect('home');
        });
    });

    // Load the game screen for the specified room
    server.get('/room/:name', function(request, response){
        if (!request.session.user) {
            response.redirect('home');
            return;
        }

        response.render('room', {room: request.params.name});
    });
};