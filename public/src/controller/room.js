define(['app'], function(app){
    return function(roomId){
        var socket = io.connect();

        socket.on('error', app.error);

        socket.on('connect', function(){
            socket.emit('room:load', roomId, function(error, data){
                if (error) {
                    console.error(error);
                    return;
                }

                require([
                    "models/game",
                    "models/player",
                    "models/room"
                ], function(error, Players, Game, Player, Room) {
                    console.log(data);
                });
            });
        });
    };
});