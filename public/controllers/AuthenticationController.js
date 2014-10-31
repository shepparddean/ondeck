/**
 * [description]
 * @param  {[type]} $scope                [description]
 * @param  {[type]} $location             [description]
 * @param  {[type]} $window               [description]
 * @param  {[type]} UserService           [description]
 * @param  {[type]} AuthenticationService [description]
 * @return {[type]}                       [description]
 * @author Dean Sheppard
 */
appControllers.controller('AuthenticationController', function($scope, $location, $window, UserService, AuthenticationService) {


	//Attributes
	$scope.error = false;
	$scope.errormessage = '';


	$scope.submitForm = function(isValid) {
		if(isValid) {
			logIn($scope.login.email, $scope.login.password);
		}
	}


	//Admin User Controller (login, logout)
	logIn = function logIn(email, password) {


		if (email !== undefined && password !== undefined) {

			UserService.logIn(email, password)

			.success(function(data) {
				AuthenticationService.isLogged = true;
				$scope.login.error = false;
				$window.sessionStorage.token = data.token;
				$location.path("/home");

			}).error(function(data, status) {
				AuthenticationService.isLogged = false;
				$scope.login.errormessage = 'Invalid account information. Please try again.';
				$scope.login.error = true;
			});
		}
	}
	

	$scope.logout = function logout() {
		if (AuthenticationService.isLogged) {
			AuthenticationService.isLogged = false;
			delete $window.sessionStorage.token;
			$location.path("/");
		}
	}

});