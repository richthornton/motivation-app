app.models.Employee = Backbone.Model.extend({

    initialize:function () {
        
    },

    sync: function(method, model, options) {
        if (method === "read") {
            app.adapters.employee.findById(parseInt(this.id)).done(function (data) {
                options.success(data);
            });
        }
    }

});

app.models.EmployeeCollection = Backbone.Collection.extend({

    model: app.models.Employee,

    initialize: function() { 
        var self = this;
        this.lastId = undefined;
        this.fetch();
    },

    //set params to 1 if you want the first page of results
    fetch: function(params){
        var self = this;
        if (this.lastId && !params) {
            params = {
                after: 't3_' + this.lastId
            }
        }
        params = params || {};
        if (params === 1){
            params = {};
        }
        $.getJSON("http://www.reddit.com/r/GetMotivated/.json?jsonp=?", params, function (json) {
            var listing = json.data.children;
            this.listing = listing;
            self.add(self.parse(listing));
            if (listing && listing.length > 0) {
                self.lastId = listing[listing.length - 1].data.id;
            } else {
                self.lastId = undefined;
            }
        });
    },

    sync: function(method, model, options) {
        if (method === "read") {
            return this.listing;
        }
    },

    parse: function(listing){
        var posts = _.filter(listing, function(post){ 
            return post.data.domain === ("i.imgur.com" || "imgur.com"); 
        });
        return posts;
    }

});