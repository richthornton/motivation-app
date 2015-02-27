var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {}
};

$(document).on("ready", function () {
    app.utils.templates.load(["HeaderView", "PostsListItemView", "AboutView", "FavouritesListItemView" ],
        function () {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
            $(".button-collapse").sideNav({
                closeOnClick: true
            });
        });
});