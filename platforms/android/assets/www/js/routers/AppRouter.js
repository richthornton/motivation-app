app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""     : "home",
        "about": "about"
    },

    initialize: function () {
        app.slider = new PageSlider($('body'));

    },

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!app.homeView) {
            app.headerView = new app.views.HeaderView();
            app.headerView.render();
        } else {
            console.log('reusing home view');
            app.headerView.delegateEvents(); // delegate events when the view is recycled
        }
        app.slider.slidePage(app.headerView.$el);
        app.employeeListView = new app.views.EmployeeListView({
            model: new app.models.EmployeeCollection()
        });
        app.employeeListView.render();
    }

});