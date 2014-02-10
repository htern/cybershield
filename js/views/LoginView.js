define([
	'knockout',
	'utils/AuthenticateUser'
	],

function (ko, AuthenticateUser) {

    var LoginView = {
        show: function () {
            var loginViewModel = {
                //Listen submit button
                handleLogin: function () {
                    Logger.log("handling login");
                    var username = $("#username").val();
                    var password = $("#password").val();

                    AuthenticateUser.login(username, password, function(user, errorMsg) {
                    	
                    	if (errorMsg) {
                            loginViewModel.errorMsg = Session.get("login-ErrorMsg");
                            loginViewModel.visible = (loginViewModel.errorMsg ? true : false);
                            loginViewModel.admin = false;

                            // Load login template and binding loginViewModel to login page
                            $("#subTabPage").empty();
                            $("#mainView").empty();
                            $("#mainView").load('templates/login.html', function () {
                                ko.applyBindings(loginViewModel, $("#login-form").get(0));
                            });
                    	} else {	// login success
                    		console.log("Login success: "+user.username);
                    		//set login user
                    		Session.set("loginAs", user.username);
                            Session.set("client_id", user.client_id);
                            
//                    		var encPwd = AuthenticateUser.encrypt(password);
//                            console.log("returned enc password: "+encPwd);
//                            console.log("encrypt password: password  - " + AuthenticateUser.encrypt('password'));
                            
//                            var decPwd = AuthenticateUser.decrypt(encPwd);
//                            console.log("decrypted password: "+decPwd);
                            
                            //if successful, set timeout to 1 day 
                            var session_timeout = 24*60; // expired in 1 day
                            utils.createCookie("USER", username, session_timeout);
                            $("#mainBody").trigger("shownavigation");

                            window.location = "#/assessments";
                    	};
                    });
                }
            };
            
            loginViewModel.errorMsg = Session.get("login-ErrorMsg");
            loginViewModel.visible = loginViewModel.errorMsg ? true : false;
            loginViewModel.admin = false;	//Session.get("admin");

            // Load login template and binding loginViewModel to login page
            $("#subTabPage").empty();
            $("#mainView").empty();
            $("#mainView").load('templates/login.html', function () {
                ko.applyBindings(loginViewModel, $("#login-form").get(0));
            });

            // redirect to assessment page if user already login
            if (utils.readCookie("USER")) {
            	console.log("redirect to /assessments");
            	window.location = "#/assessments";
            }
        }
    
    };
    
    return LoginView;
});