// main.js
var app = angular.module('nablerApp', 
    [
    'ngRoute', 
    'ui.bootstrap',
    'trNgGrid',
    'appControllers',
    'appServices'
    ]);


//This defines the controllers that are available within the application
var appControllers = angular.module('appControllers', []);

//This defines the services that are available within the application
var appServices    = angular.module('appServices', []);


var options = {};
options.api = {};
// options.api.base_url = "http://localhost:8081";

app.config(function($locationProvider, $routeProvider) {

$routeProvider.
        when('/', {
            templateUrl: 'views/main.html',
            access: { requiredLogin: false }
        }).
        when('/home', {
            templateUrl: 'views/main.html',
            access: { requiredLogin: false}
        }).
        when('/application/ondeckv2', {
            templateUrl: 'views/application/v2/ondeck-main.html',
            access: { requiredLogin: false}
        }).
        otherwise({
            redirectTo: '/home',
            access: { requiredLogin: true}
        });

});

// app.config(function ($httpProvider) {
//     $httpProvider.interceptors.push('TokenInterceptor');
// });


// Now, we have to configure our routes to let AngularJS knows when a
// specific route needs an authentication, and when it’s the case, we 
// have to check the user is authenticated by checking the isLogged value of
// the AuthenticationService:
app.run(function($rootScope, $location, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        // console.log('Intercepting the route change');
        // console.log('Going to ', nextRoute);
        // console.log('Access Required ', nextRoute.access ? nextRoute.access.requiredLogin : 'unknown');
        // console.log('Authenticated ', AuthenticationService.isLogged );
        
        if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
            $location.path("/login");
        }
    });
});