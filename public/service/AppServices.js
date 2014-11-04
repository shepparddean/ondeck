appServices.factory('AuthenticationService', function() {
    var auth = {
        isLogged: true
    }

    return auth;
});


appServices.factory('UserService', function($http) {
    return {

        logIn: function(email, password) {
            return $http.post('/api/login', {
                email: email,
                password: password
            });
        },

        logOut: function() {
            console.log('You wanna log?');
        },

        isAuthenticated: function() {
            return true;
        }
    }
});




appServices.factory('FormService', function($http) {

    var applicationId;

    return {

        save: function(data) {
            if (data.SBApplicationId == undefined || data.SBApplicationId == '') {
                $http.post('/api/applications', data)
                    .success(function(data) {
                        console.log('Success: Saved', data);
                        applicationId = data.id;
                    });
            }

        },

        getApplicationId: function() {
            return applicationId;
        },

        attachDocument: function(data) {
            console.log('Attach a document', data);
        }

    }

});


appServices.factory('OwnerService', function($http) {

    return {
        save: function(data, applicationId) {
            return $http.post('/api/applications/' + applicationId + '/owners', data);
        },


        /**
         * Get the owners on the application, if any;
         * 
         * @param  {[type]} applicationId [description]
         * @return {[type]}               [description]
         */
        getOwners: function(applicationId) {
            return $http.get('/api/applications/' + applicationId + '/owners' );
        }
    }

});

