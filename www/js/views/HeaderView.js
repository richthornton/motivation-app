app.views.HeaderView = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {
    	var body = $('body');
        var elements = this.$el.html(this.template());
        body.append(elements);
        return this;
    }

});