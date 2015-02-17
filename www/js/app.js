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

// window.onload = function() {
//     WebPullToRefresh.init( {
//         loadingFunction: exampleLoadingFunction
//     } );
// };

// // Just an example loading function that returns a
// // promise that WebPullToRefresh can use.
// var exampleLoadingFunction = function() {
//     return new Promise( function( resolve, reject ) {
//         // Run some async loading code here
//         var routerReturned = app.router.navigate('home', {trigger: true});

//         if ( routerReturned /* if the loading worked */ ) {
//             resolve();
//         } else {
//             reject();
//         }
//     } );
// };