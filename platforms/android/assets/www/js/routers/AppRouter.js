app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        ""     : "home",
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
            $(".scroller").pullToRefresh();

            $(".p2r")
                .on("move.pulltorefresh", function (e, p){
                    $(this).html("Move ! (" + p+")")
                })
                  .on("end.pulltorefresh", function (){
                    $(this).html("Pull me")
                  })
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
    },

    favourite: function () {
        
    }

});