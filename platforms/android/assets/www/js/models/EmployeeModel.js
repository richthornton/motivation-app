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
        var fullurl = "https://www.reddit.com/r/GetMotivated/.json";
        $.getJSON(fullurl, function(json){
            var listing = json.data.children;
            this.listing = listing;
            self.set(self.parse(listing));
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