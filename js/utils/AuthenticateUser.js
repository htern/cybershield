/**
 * Authenticate User
 */

define([
	'models/UserModel',
	'libs/gibberish-aes-1.0.0'
   ],
		
function (UserModel, GibberishAES) {
    var AuthenticateUser = {
    	
        encrypt: function (password) {
        	return GibberishAES.enc(password, "EZ-as123");
        },
        
        decrypt: function (encPassword) {
        	return GibberishAES.dec(encPassword, "EZ-as123");
        },
        
        login: function (username, password, callback) {
        	// clear Session
        	Session.clear();

        	// validate username
        	this.getUser(username, function(userData) {

            	var errorMsg = null;

            	if (userData.password) {	// success: username exist
                	
                	// validate password
        			var decPwd = AuthenticateUser.decrypt(userData.password);
        			var userEnteredPwd = $("#password").val();
        			
        			if (userEnteredPwd === decPwd) {
        				console.log("password matched!"); // success
        			} else {
        				errorMsg = "The username or password is not valid: " +
        						"Please check and enter your username and password correctly.";
        			}
                	
            	} else {
            		errorMsg = "Invalid Username: Please check and enter your username again.";
            	}
        		Session.set("login-ErrorMsg", errorMsg);

        		callback(userData, errorMsg);
            	
        	});
        	
        },
        
        getUser: function (username, callback) {
            // fetch user
            var user = new UserModel({username: username});
            Session.set("username", username);
            Session.set("user-profile", null);
            Session.set("admin", false);
            user.fetch({
                success: function (data) {
                	console.log("success retrieving data: "+username);
                	Session.set("user-profile", data.attributes);
                	Session.set("admin", (data.attributes.admin && data.attributes.admin==="1" ? true : false));
                	callback(data.attributes);
                }
            });
        },
        
        getUserProfile: function (username) {
        	var user = new UserModel({username: username});
        	user.fetch({
        		success: function (data) {
        			console.log("getUserProfile:");
                	Session.set("user-profile", data.attributes);
        			console.log(Session.get("user-profile"));
        		}
        	});
        },
        
        userFound: function (username, callback) {
            var user = new UserModel({username: username});
            user.fetch({
	            success: function (data) {
	            	callback(data.attributes);
	        	}
            });
        }
    };

    return AuthenticateUser;
});