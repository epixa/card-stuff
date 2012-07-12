/**
 * Sets up all of the application routes
 *
 * The application intentionally has limited routes on the backend as most
 * dynamic functionality occurs on the frontend.
 *
 * @param App    The application state
 * @param server The underlying express-based web server
 */
module.exports = function(App, server){
    /**
     * A catch-all to make sure the user specifies a room or logs in
     *
     * If the current session does not contain a user identity, then a login
     * form is rendered.  Otherwise, the user is logged in so the room index
     * is rendered.
     */
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

    /**
     * Handles the processing of the login form
     *
     * If the posted credentials are valid, then the user is redirected to the
     * room index.
     */
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

    /**
     * Loads the game screen for the specified room
     *
     * While most of the dynamic loading occurs on the frontend, this renders
     * the base room page which will include the frontend JavaScript to load
     * the given room.
     *
     * If the user is not logged in, they are redirected back to the login page
     */
    server.get('/room/:name', function(request, response){
        if (!request.session.user) {
            response.redirect('home');
            return;
        }

        response.render('room', {room: request.params.name});
    });
};
