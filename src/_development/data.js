/**
 * Sets up the default data for development
 *
 * While no data is removed with this, arbitrary new data is created if it
 * doesn't already exist. As such, this should never be ran in production.
 *
 * @param App The application state
 */
module.exports = function(App){
    // Set up any missing users
    ['court', 'dan', 'elyse', 'kurt'].forEach(function(username){
        var User = App.Modules.User.Model;
        User.findOne({ username: username }, function(error, user){
            if (error) {
                console.error('Could not determine if user `' + username + '` exists: ' + error);
            } else if (!user) {
                user = new User({ username: username });
                user.save();
                console.info('Created user: ' + username);
            }
        });
    });

    // Set up any missing rooms
    ['cerf', 'babbage', 'lovelace', 'dijkstra'].forEach(function(name){
        var Room = App.Modules.Room.Model;
        Room.findOne({ name: name }, function(error, room){
            if (error) {
                console.error('Could not determine if room `' + name + '` exists: ' + error);
            } else if (!room) {
                room = new Room({ name: name, game: {}, players: {} });
                room.save();
                console.info('Created room: ' + name);
            }
        });
    });

    // Set up any missing game types
    ['golf'].forEach(function(name){
        var GameType = App.Modules.GameType.Model;
        GameType.findOne({ name: name }, function(error, type){
            if (error) {
                console.error('Could not determine if game type `' + name + '` exists: ' + error);
            } else if (!type) {
                type = new GameType({ name: name });
                type.save();
                console.info('Created game type: ' + name);
            }
        });
    });
};
