define(['/src/app'], function(app){
    var current = {};

    return function(roomId){
        var socket = io.connect();

        socket.on('error', app.error);

        socket.on('connect', function(){
            socket.emit('room:load', roomId, function(data){
                require([
                    "/src/modules/room",
                    "/src/modules/player",
                    "/src/modules/game/" + data.game.name
                ], function(error, Room, Player, Game) {
                    current.room = new Room.Model(data);
                    current.player = new Player.Model(data.player);
                    current.players = new Player.List(data.players);
                    current.game = new Game.Model(data.game);
                });
            });
        });
    };
});