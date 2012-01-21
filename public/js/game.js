window.nsfw = window.nsfw || {};
nsfw.cards = nsfw.cards || {};

(function($){
    /**
     * A generic card game
     *
     * @param config
     */
    nsfw.cards.Game = function(config){
        if (typeof config.id == 'undefined') {
            throw "Game id not specified in game config";
        }

        this.id = config.id;

        now.join(config.id);
    };


    /**
     * Alert to an error
     *
     * @param message
     */
    now.error = function(message){
        var error = 'Error: ' + message;
        console.log(error);
        alert(error);
    };

    /**
     * Indicates that the given user has left the current game
     *
     * @triggers game.playerLeft
     *
     * @param user
     */
    now.playerLeft = function(user){
        console.log('Triggering game.playerLeft for player ' + user.name);
        $(document).trigger('game.playerLeft', [user]);
    };

    /**
     * Indicates taht the given user has joined the current game
     *
     * @triggers game.playerJoined
     *
     * @param user
     */
    now.playerJoined = function(user){
        console.log('Triggering game.playerJoined for player ' + user.name);
        $(document).trigger('game.playerJoined', [user]);
    };
})(jQuery);