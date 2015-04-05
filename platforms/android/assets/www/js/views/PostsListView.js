app.views.PostsListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        var self = this;
        $('.preloader-wrapper').show();
        this.listenTo(this.model, "reset", this.render);
        this.listenTo(this.model, "add", function (post) {
            self.$el.append(new app.views.PostsListItemView({model:post}).render().el);
            self.setNewScrollFire();
        });
        this.lastVisibleModelId = undefined;

        var el = null

    },

    render:function () {
        this.$el.empty();
        _.each(this.model.models, function (post) {
            this.$el.append(new app.views.PostsListItemView({model:post}).render().el);
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
                var idName = '#' + this.lastVisibleModelId;
                 var options = [
                    {selector: idName, offset: 300, callback: 'app.postsListView.model.fetch()' },
                  ];
                  scrollFire(options);
            }
        }
    }
});

app.views.PostsListItemView = Backbone.View.extend({

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
        var checkModel = undefined;
        var theModelId = this.model.attributes.data.id;
        var arrayLength = app.models.favourites.models.length;
        for (var i = 0; i < arrayLength; i++) {
            if (app.models.favourites.models[i].attributes.data.id === theModelId){
                checkModel = true;
                break;
            }
        }
        //var checkModel = app.models.favourites.models.find( function(model){return model.attributes.data.id == theModelId;});
        if (checkModel) {
            this.isFavourite = true;
        }
        else {
            this.isFavourite = false;
        }
        var attributesToPassIn = this.model.attributes;
        attributesToPassIn.isFavourite = this.isFavourite;
        this.$el.html(this.template(attributesToPassIn));
        return this;
    },

    addItemToFavourites:function () {
        app.models.favourites.add(this.model);
        toast('Added to favourites!', 3000, 'rounded');

        db.collection('motivationFavourites').insert(
            this.model
        );

        // Now we've added the item to the collection, tell
        // forerunner to persist the data
        db.collection('motivationFavourites').save();

        this.render();
    }

});