define(['backbone','knockout','knockback'],
    function(Backbone, ko, kb) {

        var ToolbarViewModelClass = {
            viewModel: null,
            show: function() {
                var self = this;
                var model = new Backbone.Model({
                    visible: utils.readCookie("USER") ? true: false,
                    username: utils.readCookie("USER"),
                    admin: Session.get("admin") ? Session.get("admin") : false
                });

                this.viewModel = kb.viewModel(model);
                this.viewModel.logout = this.logout;
                this.viewModel.viewProfile = this.viewProfile;

//                this.viewModel.username = utils.readCookie("USER");
//                console.log("USER in viewModel: "+this.viewModel.username);

                $('#toolbar').load('templates/toolbar.html', function() {
                    ko.applyBindings(self.viewModel, $('#toolbar').get(0));
                });
            },

            showNavigation: function() {
//                var userProfile = Session.get("user-profile");
//                console.log(userProfile);
//                var fullname = userProfile.first_name + " " + userProfile.last_name;
                var model = new Backbone.Model({
                    visible: utils.readCookie("USER")? true: false,
                    username: utils.readCookie("USER"),
//                    username: fullname,
                    admin: Session.get("admin") ? Session.get("admin") : false
                });
//                model.username = utils.readCookie("USER");
                console.log("in ToolbarView: Cookie User = "+utils.readCookie("USER"));

                this.viewModel.model(model);
            },
            
            viewProfile: function() {
            	window.location = "#/userProfile/"+Session.get("username");
            	
            },

            logout: function() {
                $("#mainBody").trigger("logout");
            }
        };

        return ToolbarViewModelClass;
    }
);