define([
    'views/LoginView',
    'views/ToolbarView'],

    function(LoginView, ToolbarView) {

    var MainView = {
        init: function() {
            Logger.log("binding login to main body");

            //Listen to events
            $("#mainBody").unbind();

            $("#mainBody").bind('login', this.showLoginForm);
            $("#mainBody").bind('shownavigation', this.showNavigation);
            $("#mainBody").bind('logout', this.logout);

            ToolbarView.show();
        },

        showLoginForm: function() {
            LoginView.show();
        },

        showNavigation: function() {
        	console.log("showing Navigation...");
            ToolbarView.showNavigation();
//            HeaderViewModel.showNavigation();
        },
        
        logout: function() {
        	console.log("logout...");
            utils.clearCookie("USER");
            Session.clear();
//            ko.cleanNode($("#active-content")[0]);
            ToolbarView.showNavigation();
            window.location = "#"
        }

    };

    return MainView;

})