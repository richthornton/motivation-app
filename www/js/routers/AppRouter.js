app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""     : "home",
        "home" : "home",
        "about": "about",
        "favourite": "favourite"
    },

    initialize: function () {
        app.slider = new PageSlider($('body'));

        app.headerView = new app.views.HeaderView();
        app.headerView.render();
        app.slider.slidePage(app.headerView.$el);

        $( document ).ready(function(){
            $(".button-collapse").sideNav();
        }) 


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