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

        now.joinGame(config.id);
    };


    /**
     * Indicates that the given user has left the current game
     *
     * @events
     *  game.playerLeft
     *
     * @param user
     */
    now.playerLeft = function(user){
        console.log('Triggering game.playerLeft for player ' + user.clientId);
        $(document).trigger('game.playerLeft', [user]);
    };
})(jQuery);