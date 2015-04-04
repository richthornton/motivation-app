app.models.Favourites = Backbone.Model.extend({

    initialize:function () {
        
    },

    sync: function(method, model, options) {
        if (method === "read") {
            app.adapters.posts.findById(parseInt(this.id)).done(function (data) {
                options.success(data);
            });
        }
    }

});

app.models.FavouritesCollection = Backbone.Collection.extend({

    model: app.models.Favourites,

    initialize: function() { 
        var self = this;
        this.lastId = undefined;
        //this.fetch();
    },

    fetch: function() {
        // Ask forerunner to load any persistent data previously
        // saved for this collection
        var favouritesDB = db.collection('motivationFavourites');
        console.log(favouritesDB);
        this.set(favouritesDB._data);
        
    }

});