define(function(){
    var View = Backbone.View.extend({
        id: 'room',

        template: _.template($('#room-template').html()),

        events: {},

        render: function(){
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return View;
});