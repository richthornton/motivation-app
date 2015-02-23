app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""     : "home",
        "home" : "home",
        "about": "about",
        "favourite": "favourite"
    },

    initialize: function () {
        app.headerView = new app.views.HeaderView();
        app.headerView.render();

    },

    home: function () {
        if (app.employeeListView) {
            app.employeeListView.remove();
        }
        app.employeeListView = new app.views.EmployeeListView({
            model: new app.models.EmployeeCollection()
        });
        app.employeeListView.render();
        return true;
    },

    favourite: function () {
        
    }

});