app.views.HeaderView = Backbone.View.extend({

    events: {
        "click .refresh-from-navbar": "refreshFromNavbar",
        "click .eula-accepted": "acceptEula"
        },

    initialize: function () {
    },

    render: function () {
    	var body = $('body');
        var elements = this.$el.html(this.template());
        body.append(elements);
        return this;
    },

    eulaAlreadyAccepted: function(){
        var eulaState;
        if (this.checkIfLocalStorageCompatible){
            eulaState = localStorage.getItem("eulaAccepted"); 
        }
        if (eulaState === true){
            return true;
        }
        else {
            $('#modalEula').openModal();
            return false;
        }
    },

    acceptEula: function(){
        if (this.checkIfLocalStorageCompatible){
            localStorage.setItem("eulaAccepted", true);
        }
    },

    checkIfLocalStorageCompatible: function(){
        if(typeof(Storage) !== "undefined") {
            return true;
        } else {
            return false;
        }
    },

    refreshFromNavbar: function (){
    	if (app.postsListView){
    		app.postsListView.model.reset();
    		app.postsListView.model.fetch(1);
    	}
    }

});