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
        $(window).scroll(this.checkScroll);

        window.onload = function() {
            WebPullToRefresh.init( {
                loadingFunction: exampleLoadingFunction
            } );
        };
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
        return new Promise( function( resolve, reject ) {
            // Run some async loading code here
            this.model.fetch(1); 
            if ( true /* if the loading worked */ ) {
                resolve();
            } else {
                reject();
            }
        } );
    },

    loadResults: function () {
      var that = this;
      // we are starting a new load of results so set isLoading to true
      this.isLoading = true;
      // fetch is Backbone.js native function for calling and parsing the collection url
      this.model.fetch();      
    },

    checkScroll: function () {
        var triggerPoint = 100; // 100px from the bottom
        var self = this;

        // // document.body.scrollTop alone should do the job but that actually works only in case of Chrome.
        // // With IE and Firefox it also works sometimes (seemingly with very simple pages where you have
        // // only a <pre> or something like that) but I don't know when. This hack seems to work always.
        // var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        // // >= is needed because if the horizontal scrollbar is visible then window.innerHeight includes
        // // it and in that case the left side of the equation is somewhat greater.
        // var scrolledToBottom = (scrollTop + window.innerHeight) >= document.documentElement.scrollHeight;

        var scrolledToBottom = $(window).scrollTop() + $(window).height() == $(document).height();

        if( scrolledToBottom === true) {
          self.loadResults();
        }
    }
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