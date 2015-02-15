var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {}
};

$(document).on("ready", function () {
    app.utils.templates.load(["HeaderView", "EmployeeListItemView", "AboutView" ],
        function () {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
        });
});