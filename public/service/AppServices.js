

appServices.factory('AuthenticationService', function() {
    var auth = {
        isLogged: true
    }
 
    return auth;
});


appServices.factory('UserService', function($http) {
    return {

        logIn: function(email, password) {
            return $http.post('/api/login', {email: email, password: password});
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

    return  {

        save: function(data) {
            if (data.SBApplicationId == undefined || data.SBApplicationId == '') {
                $http.post( '/api/applications', data )
                .success(function(data) {
                    console.log('Success: Saved', data);
                });
            }            
                        
        },

        attachDocument: function(data) {
            console.log('Attach a document', data);
        }

    }

})

// appServices.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
//     return {
//         request: function (config) {
//             config.headers = config.headers || {};
//             if ($window.sessionStorage.token) {
//                 config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
//             }
//             return config;
//         },
 
//         requestError: function(rejection) {
//             return $q.reject(rejection);
//         },
 
//         /* Set Authentication.isAuthenticated to true if 200 received */
//         response: function (response) {
//             if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
//                 AuthenticationService.isAuthenticated = true;
//             }
//             return response || $q.when(response);
//         },
 
//         /* Revoke client authentication if 401 is received */
//         responseError: function(rejection) {
//             if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
//                 delete $window.sessionStorage.token;
//                 AuthenticationService.isAuthenticated = false;
//                 $location.path("/admin/login");
//             }
 
//             return $q.reject(rejection);
//         }
//     };
// });