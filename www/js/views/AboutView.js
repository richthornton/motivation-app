app.views.AboutView = Backbone.View.extend({

    initialize:function () {
        var self = this;
    },

    render:function () {
        this.$el.empty();
        $('.scroller').empty();
        $('.scroller').append(this.template);
        return this;
    }
});
