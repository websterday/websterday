'use strict';

angular.module('bookmarksApp')
	.controller('UserAddCtrl', ['$scope', 'growl', 'User', function ($scope, growl, User) {

		$scope.user = {};

		$scope.showConfirmation = false;

		$scope.create = function() {
			if ($scope.user.username != null && $scope.user.email != null && $scope.user.password != null &&
				$scope.user.confirmPassword != null) {
				if ($scope.user.password == $scope.user.confirmPassword) {
					delete $scope.user.confirmPassword;
					// console.log($scope.user);
					User.post({user: $scope.user}, function(data) {
						if (angular.isDefined(data[0]) && data[0] == 1) {
							$scope.showConfirmation = true;
						}  else if (angular.isDefined(data.error)) {
							growl.addErrorMessage(data.error);
						}
					});
				} else {
					growl.addErrorMessage('Passwords are different');
				}
			} else {
				growl.addErrorMessage('All fields are required');
			}
		}
	}])
	.controller('UserLoginCtrl', ['$scope', '$cookieStore', '$location', 'User', function ($scope, $cookieStore, $location, User) {
		$scope.showError = false;

		$scope.login = function(username) {
			$scope.showError = false;

			if ($scope.username != null && $scope.password != null) {
				// console.log('login');
				User.authenticate({username: $scope.username, password: $scope.password}, function(data) {
					if (angular.isDefined(data.token)) {
						$cookieStore.put('token', data.token);

						$scope.showError = false;

						$location.path('/');
					} else {
						$scope.showError = true;
					}
				});
			}
		}
	}])
	.controller('UserAccountCtrl', ['$scope', '$cookieStore', '$location', 'User', function ($scope, $cookieStore, $location, User) {
		
	}])
	.controller('UserLogoutCtrl', ['$scope', '$cookieStore', '$location', function ($scope, $cookieStore, $location) {
		$cookieStore.remove('token');

		$location.path('/');
	}])
	.controller('UserForgottenPasswordCtrl', ['$scope', function ($scope) {
		
	}]);
