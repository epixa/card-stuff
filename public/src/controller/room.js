define([
    'app',
    'models/player',
    'models/room'
], function(App, Player, Room){
    return function(roomName){
        App.socket = io.connect();

        App.socket.on('error', App.error);

        App.socket.on('connect', function(){
            var room = new Room.Model();

            room.fetch({
                name: roomName,
                success: function(room){
                    room.players.fetch({ room: room.id });
                }
            });
        });
    };
});