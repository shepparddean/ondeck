appControllers.controller('OnDeckController', function($scope, $http, $location, $window,
	FormService) {


	$scope.formData = {};
	

	$scope.processForm = function() {
		FormService.save($scope.formData);
	}


});

