app.views.HeaderView = Backbone.View.extend({

    events: {
        "click .refresh-from-navbar": "refreshFromNavbar"
        },

    initialize: function () {
    },

    render: function () {
    	var body = $('body');
        var elements = this.$el.html(this.template());
        body.append(elements);
        return this;
    },

    refreshFromNavbar: function (){
    	if (app.postsListView){
    		app.postsListView.model.reset();
    		app.postsListView.model.fetch(1);
    	}
    }

});