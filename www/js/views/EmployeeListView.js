app.views.EmployeeListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        var self = this;
        this.isLoading = false;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (employee) {
            self.$el.append(new app.views.EmployeeListItemView({model:employee}).render().el);
        });
        this.model = new app.models.EmployeeCollection();
        //$(window).scroll(this.checkScroll);

        WebPullToRefresh.init( {
            loadingFunction: this.exampleLoadingFunction
        } );

        var el = null

        var handler = this.onVisibilityChange(el);


        //jQuery
        $(window).on('DOMContentLoaded load resize scroll', handler); 
    },

    render:function () {
        this.$el.empty();
        _.each(this.model.models, function (employee) {
            this.$el.append(new app.views.EmployeeListItemView({model:employee}).render().el);
        }, this);
        $('.scroller').append(this.el);
        return this;
    },

        // Just an example loading function that returns a
    // promise that WebPullToRefresh can use.
    exampleLoadingFunction: function() {

        //var self = this;
        return new Promise( function( resolve, reject ) {
            // Run some async loading code here
            // theScope.model.fetch({data: 1, 
            //     complete: (function (e) {
            //         var requestComplete = true;
            //     }) 
            // });

             var routerReturned = app.router.navigate('home', {trigger: true});

            if ( routerReturned /* if the loading worked */ ) {
                resolve();
            } else {
                reject();
            }
        } );
    },

    onVisibilityChange: function(el, callback) {
        var el = this.findElementToCheck();
        var self = this;
        var elementTrue = this.isElementInViewport(el);
        if (elementTrue){
            console.log('CAn see the elemet!')
        }
    },

    findElementToCheck: function (){
        var $el = $('li');
        if ($el){
            if ($el.length - 2 > 0){
                var el = $el[$el.length-2];
            }
        }
        return el;
    },

    isElementInViewport: function(el) {

        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }

    // loadResults: function () {
    //   var that = this;
    //   // we are starting a new load of results so set isLoading to true
    //   this.isLoading = true;
    //   // fetch is Backbone.js native function for calling and parsing the collection url
    //   this.model.fetch();      
    // },

    // checkScroll: function () {
    //     var triggerPoint = 100; // 100px from the bottom
    //     var self = this;

    //     // // document.body.scrollTop alone should do the job but that actually works only in case of Chrome.
    //     // // With IE and Firefox it also works sometimes (seemingly with very simple pages where you have
    //     // // only a <pre> or something like that) but I don't know when. This hack seems to work always.
    //     // var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    //     // // >= is needed because if the horizontal scrollbar is visible then window.innerHeight includes
    //     // // it and in that case the left side of the equation is somewhat greater.
    //     // var scrolledToBottom = (scrollTop + window.innerHeight) >= document.documentElement.scrollHeight;

    //     var scrolledToBottom = $(window).scrollTop() + $(window).height() == $(document).height();

    //     if( scrolledToBottom === true) {
    //       self.loadResults();
    //     }
    // }
});

app.views.EmployeeListItemView = Backbone.View.extend({

    tagName:"li",

    className:"row",

    events: {
            "click .favourite-action": "addItem"
            },

    initialize:function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render:function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    addItem:function () {
        console.log(this.model);
    }

});