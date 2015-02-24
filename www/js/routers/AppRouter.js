app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""     : "home",
        "home" : "home",
        "about": "about",
        "favourites": "favourites"
    },

    initialize: function () {
        app.headerView = new app.views.HeaderView();
        app.headerView.render();
        app.models.favourites = new app.models.FavouritesCollection();
    },

    home: function () {
        if (app.postsListView) {
            app.postsListView.remove();
        }
        app.postsListView = new app.views.PostsListView({
            model: new app.models.PostsCollection()
        });
        app.postsListView.render();
        return true;
    },

    favourites: function () {
        if (app.postsListView) {
            app.postsListView.remove();
        }
        app.favouritesListView = new app.views.FavouritesListView({
            model: app.models.favourites
        });
        app.favouritesListView.render();
        return true;
    }

});