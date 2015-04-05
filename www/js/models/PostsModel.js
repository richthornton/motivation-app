app.models.Posts = Backbone.Model.extend({

    initialize:function () {
        
    },

    sync: function(method, model, options) {
        if (method === "read") {
            app.adapters.posts.findById(parseInt(this.id)).done(function (data) {
                options.success(data);
            });
        }
    }

});

app.models.PostsCollection = Backbone.Collection.extend({

    model: app.models.Posts,

    initialize: function() { 
        var self = this;
        this.lastId = undefined;
        //this.fetch();
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
        $.getJSON("http://www.reddit.com/r/GetMotivated/.json?jsonp=?", params)
             .done(function( json ) {
                var listing = json.data.children;
                this.listing = listing;
                self.add(self.parse(listing));
                if (listing && listing.length > 0) {
                    self.lastId = listing[listing.length - 1].data.id;
                } else {
                    self.lastId = undefined;
                }
             })
             .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
             });
    },

    sync: function(method, model, options) {
        if (method === "read") {
            return this.listing;
        }
    },

    parse: function(listing){
       // _.each(listing, function)
        var posts = _.filter(listing, function(post){ 
            var checkingTrue = post.data.domain === ("i.imgur.com" || "imgur.com");
            //return post.data.domain === ("i.imgur.com" || "imgur.com"); 
            return (!post.data.over_18 && 
                !post.data.url.endsWith('.gifv') &&
                !post.data.url.endsWith('.gif') &&
                (post.data.url.endsWith('.jpg') ||
                 post.data.url.endsWith('.png') ||
                  post.data.domain === "i.imgur.com" ||
                  post.data.domain === "imgur.com"));
        });
        _.each(posts, function(post){
            if(post.data.domain.indexOf('imgur') > -1){
                //adding .jpg to imgur links with no extension
                if (!post.data.url.endsWith('.jpg') || !post.data.url.endsWith('.png')){
                    post.data.url = post.data.url + '.jpg';
                }
                var postURL = post.data.url;
                var urlFirstSlashPosition = postURL.indexOf('/');
                var urlLastSlashPosition = postURL.lastIndexOf('/');
                //sorting out for the situations where the link is to a gallery
                if (urlFirstSlashPosition !== urlLastSlashPosition){
                    post.data.url = postURL.replace(postURL.substring(urlFirstSlashPosition, urlLastSlashPosition), "/imgur.com");
                }
            }
        })
        return posts;
    }

});