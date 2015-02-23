app.views.EmployeeListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        var self = this;
        this.listenTo(this.model, "reset", this.render);
        this.listenTo(this.model, "add", function (employee) {
            console.log('model added');
            self.$el.append(new app.views.EmployeeListItemView({model:employee}).render().el);
            self.setNewScrollFire();
        });
        this.lastVisibleModelId = undefined;

        var el = null

    },

    render:function () {
        this.$el.empty();
        _.each(this.model.models, function (employee) {
            this.$el.append(new app.views.EmployeeListItemView({model:employee}).render().el);
        }, this);
        $('.scroller').empty();
        $('.scroller').append(this.el);
        this.setNewScrollFire();
        return this;
    },

    setNewScrollFire:function (){
        if (this.model.models.length > 0){
            var newLastVisibleModelId = this.model.models[this.model.length - 1].attributes.data.id;
            if (newLastVisibleModelId !== this.lastVisibleModelId){
                this.lastVisibleModelId = newLastVisibleModelId;
                console.log('The lastVisibleModelId is: ' + this.lastVisibleModelId);
                var idName = '#' + this.lastVisibleModelId;
                 var options = [
                    {selector: idName, offset: 200, callback: 'app.employeeListView.model.fetch()' },
                  ];
                  scrollFire(options);
            }
        }
    }
});

app.views.EmployeeListItemView = Backbone.View.extend({

    tagName:"li",

    className:"row",

    events: {
            "click .favourite-action": "addItemToFavourites"
            },

    initialize:function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render:function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    addItemToFavourites:function () {
        console.log(this.model);
    }

});