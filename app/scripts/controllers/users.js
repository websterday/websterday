'use strict';

angular.module('bookmarksApp')
	.controller('UserAddCtrl', ['$scope', function ($scope) {

	}])
	.controller('UserLoginCtrl', ['$scope', '$cookieStore', '$location', 'User', function ($scope, $cookieStore, $location, User) {
		$scope.showError = false;

		$scope.login = function(username) {
			$scope.showError = false;

			console.log(username);

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
