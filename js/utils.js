utils = {
    uuid: function() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    },

    validateEmail: function (email) {
        var email_filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var valid = false;
        if (email_filter.test(email))
            valid = true;
        return valid;
    },

    validateStrongPassword: function (password) {
    	// at least one number, one lowercase and one uppercase letter
    	// at least six characters
    	var pwd_filter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%*()_+^&}{:;?.\-])(?=.*[a-zA-Z0-9!@#$%*()_+^&}{:;?.\-]).{6,}$/;
        var valid = false;
        if (pwd_filter.test(password))
            valid = true;
        return valid;
    },

    createCookie : function(name, value, mins) {
        var date = new Date();
        date.setTime(date.getTime() + (mins * 60 * 1000));
        expires = "expires=" + date.toGMTString();
        document.cookie = name + "=" + value + "; " + expires + "; path=/";
    },

    clearCookie: function(name) {
         this.createCookie(name, null, -60);
    },

    setSessionExpireTime : function(mins) {
        var me = this;
        me.createCookie(me.getAuthKey(), user.username , mins);
    },

    readCookie : function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    
    empty: function(field) {
    	if (this.validateString(field))
    		return false;
    	else
    		return true;
    },
    
    validateString: function(field, msg, min, max) {  

    	if (!min) { min = 1; }  
    	if (!max) { max = 65535; }  
    	
    	if (!field.val() || field.val().length < min || field.val().length > max) {
    		
    		if (msg) { alert(msg); }
	    	field.focus();  
	    	field.select();  
	    	return false;  
    	}
    	return true;
    },
    
    validateNumber: function(field, msg, min, max) {  

    	if (!min) { min = 0; }  
    	if (!max) { max = 255; }  

    	if ( (parseInt(field.value) != field.value) || 
    			field.value.length < min || field.value.length > max) {  
	    	alert(msg);  
	    	field.focus();  
	    	field.select();  
	    	return false;  
    	}  
    	return true;  
    },

    validateDate: function(dateString) {
        // First check for the pattern: yyyy-mm-dd
        if(!/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(dateString))
            return false;
        // Parse the date parts to integers
        var parts = dateString.split("-");
        var day = parseInt(parts[2], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[0], 10);

        // Check the ranges of month and year
        if(year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    },
    
    getCurrentTime: function() {
    	var today = new Date();
    	return today.getFullYear() + '-' + (1 + today.getMonth()) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    }
    
};

