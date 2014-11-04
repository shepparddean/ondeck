appControllers.controller('OwnerController',
	function($scope, $http, $location, $window,
		OwnerService, FormService) {




		
		TrNgGrid.defaultColumnOptions.displayAlign="center";
		//The owner data, in the editable form;
		$scope.ownerData = {};

		//List of owners on the application;
		$scope.owners = {};

		$scope.processOwner = function() {
			OwnerService.save($scope.ownerData, FormService.getApplicationId())
				.success(function(data) {
					// console.log('Owner Success: Saved', data);
					//$scope.ownerData = {};
					$scope.getOwners();
				});

			

		},

		$scope.getOwners = function() {
			OwnerService.getOwners(FormService.getApplicationId())
				.success(function(data) {
					$scope.owners = data.owners;
					console.log($scope.owners);
					//console.log('Owners Retrieved: ', data.owners);
				});
		}



		

	});