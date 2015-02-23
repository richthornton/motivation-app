app.views.EmployeeListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        var self = this;
        this.isLoading = false;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (employee) {
            self.$el.append(new app.views.EmployeeListItemView({model:employee}).render().el);
        });
        this.model = new app.models.EmployeeCollection();
        //$(window).scroll(this.checkScroll);

        var el = null

    },

    render:function () {
        this.$el.empty();
        _.each(this.model.models, function (employee) {
            this.$el.append(new app.views.EmployeeListItemView({model:employee}).render().el);
        }, this);
        $('.scroller').append(this.el);
        return this;
    }
});

app.views.EmployeeListItemView = Backbone.View.extend({

    tagName:"li",

    className:"row",

    events: {
            "click .favourite-action": "addItem"
            },

    initialize:function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render:function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    addItem:function () {
        console.log(this.model);
    }

});