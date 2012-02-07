define(['utilities/error_handler', 'registries/room'], function(err, registry){
    return function(roomId){
        registry.socket = io.connect();

        registry.socket.on('error', err.notify);

        registry.socket.on('connect', function(){
            registry.socket.emit('room:load', roomId, function(error, data){
                if (error) {
                    err.notify({ severity: 'FATAL', type: 'room:load-failed', error: error });
                    return;
                }

                require([
                    "models/player",
                    "models/room",
                    "models/game"
                ], function(Player, Room, Game) {
                    if (typeof data.players != 'object' || !(data.players instanceof Array)) {
                        console.log(typeof data.players);
                        err.notify({ severity: 'FATAL', type: 'room:invalid-players' });
                        return;
                    }

                    if (typeof data.room != 'object') {
                        err.notify({ severity: 'FATAL', type: 'room:invalid-room' });
                        return;
                    }

                    if (typeof data.player != 'object') {
                        err.notify({ severity: 'FATAL', type: 'room:invalid-player' });
                        return;
                    }

                    if (typeof data.room.game == 'object') {
                        registry.game = new Game.Model(data.room.game);
                        delete data.room.game;
                    }

                    registry.room = new Room.Model(data.room);
                    registry.player = new Player.Model(data.player);
                    registry.players = new Player.Collection(data.players, { silent: true });

                    console.log(registry);
                });
            });
        });
    };
});