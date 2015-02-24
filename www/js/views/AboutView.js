app.views.AboutView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (post) {
            self.$el.append(new app.views.PostsListItemView({model:post}).render().el);
        });
    },

    render:function () {
        this.$el.empty();
        _.each(this.model.models, function (post) {
            this.$el.append(new app.views.PostsListItemView({model:post}).render().el);
        }, this);
        return this;
    }
});
