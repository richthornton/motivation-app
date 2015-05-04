app.views.FavouritesListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        var self = this;
    },

    render:function () {
        this.$el.empty();
        _.each(this.model.models, function (post) {
            this.$el.append(new app.views.FavouritesListItemView({model:post}).render().el);
        }, this);
        $('.scroller').empty();
        $('.scroller').append(this.el);
        $('.preloader-wrapper').hide();
        //var testDiv = $( 'div #content' );
        //$( 'div #content' ).scrollTop( 65 );
        var body = $("window");
        var top = body.scrollTop(0);
        return this;
    }
});

app.views.FavouritesListItemView = Backbone.View.extend({

    tagName:"li",

    className:"row",

    events: {
            "click .unfavourite-action": "toastBeforeDeleting"
            },

    initialize:function () {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "remove", this.remove);

    },

    render:function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    toastBeforeDeleting:function () {
        this.dontDelete = false;
        var theId = '#' + this.model.attributes.data.id;
        toast('<span>Item Deleted </span><a class="waves-effect waves-light btn" onclick="$( \'.card\' ).show();"> Undo</a>', 4000,'',this.removeItemFromFavourites.bind(this));
        $(theId).hide();
    },

    removeItemFromFavourites:function () {
        var theId = '#' + this.model.attributes.data.id;
        if ($(theId).is(':hidden')) {
            //this will be removing an item from the favourites
            app.models.favourites.remove(this.model);
            this.model.save();

            // Get the item id for the todo item clicked on
            db.collection('motivationFavourites').remove(this.model);
            db.collection('motivationFavourites').save();
            //app.models.favourites.each(function (model) { model.save(); });
        }
        else {
            return;
        }
    },

    setDontDeleteFlag:function () {
        this.dontDelete = true;
    }

});