define([
    'app',
    'models/player',
    'models/room'
], function(App, Player, Room){
    return function(roomId){
        App.socket = io.connect();

        App.socket.on('error', App.error);

        App.socket.on('connect', function(){
            var room = new Room.Model({ name: roomId });
            room.load();
            console.log(room);
        });
    };
});