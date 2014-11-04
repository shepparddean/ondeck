appControllers.controller('DashboardController',
	function($scope, $http, $location, $window,
		ApplicationService) {


		//List of applications;
		$scope.applications = {};


		$scope.getApplications = function() {

			ApplicationService.getApplications()
				.success(function(data) {
					$scope.applications = data.applications;
					console.log($scope.applications );
					//console.log(data.applications);
					//console.log('Owners Retrieved: ', data.owners);
				});


		}

		//get the applications;
		$scope.getApplications();



	});