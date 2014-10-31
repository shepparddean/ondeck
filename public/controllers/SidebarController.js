/**
 * This controller manages the sidebar menu;
 * 
 * @param  {[type]} $scope                [description]
 * @param  {[type]} $location             [description]
 * @param  {[type]} $window               [description]
 * @param  {[type]} UserService           [description]
 * @param  {[type]} AuthenticationService [description]
 * @return {[type]}                       [description]
 */
appControllers.controller('SidebarController', function($scope, $location, $window, UserService, AuthenticationService) {


	$scope.isAuthenticated = function() {
		return AuthenticationService.isLogged;
	}
	

});