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
        // // Since the home view never changes, we instantiate it and render it only once
        // if (!app.homeView) {
        //     app.headerView = new app.views.HeaderView();
        //     app.headerView.render();
        // } else {
        //     console.log('reusing home view');
        //     app.headerView.delegateEvents(); // delegate events when the view is recycled
        // }
        // app.slider.slidePage(app.headerView.$el);
        app.employeeListView = new app.views.EmployeeListView({
            model: new app.models.EmployeeCollection()
        });
        app.employeeListView.render();
        return true;
    },

    favourite: function () {
        
    }

});