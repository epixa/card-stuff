window.nsfw = window.nsfw || {};
nsfw.cards = nsfw.cards || {};

(function($){
    nsfw.cards.Game = function(config){
        if (typeof config.id == 'undefined') {
            throw "Game id not specified in game config";
        }

        now.joinGame(config.id);
    };
})(jQuery);