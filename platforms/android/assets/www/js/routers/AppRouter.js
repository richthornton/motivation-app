app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""     : "home",
        "home" : "home",
        "about": "about",
        "favourites": "favourites"
    },

    initialize: function () {
        app.models.favourites = new app.models.FavouritesCollection();
        app.models.favourites.fetch();
        app.headerView = new app.views.HeaderView();
        app.headerView.render();
    },

    home: function () {
        $('.brand-logo').text('GetMotivated');
        $('.refresh-from-navbar').show();
        if (app.postsListView) {
            app.postsListView.remove();
        }
        if (app.favouritesListView) {
            app.favouritesListView.remove();
        }
        app.postsListView = new app.views.PostsListView({
            model: new app.models.PostsCollection()
        });
        app.postsListView.render();
        return true;
    },

    favourites: function () {
        $('.brand-logo').text('Favourites');
        $('.refresh-from-navbar').hide();
        if (app.postsListView) {
            app.postsListView.remove();
        }
        if (app.favouritesListView) {
            app.favouritesListView.remove();
        }
        app.favouritesListView = new app.views.FavouritesListView({
            model: app.models.favourites
        });
        app.favouritesListView.render();
        return true;
    },

    about: function () {
        $('.brand-logo').text('About');
        $('.refresh-from-navbar').hide();
        if (app.postsListView) {
            app.postsListView.remove();
        }
        if (app.favouritesListView) {
            app.favouritesListView.remove();
        }
        app.aboutView = new app.views.AboutView();
        app.aboutView.render();
        return true;
    }

});