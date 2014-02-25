'use strict';

angular.module('bookmarksApp')
	.controller('UserAddCtrl', ['$scope', function ($scope) {

	}])
	.controller('UserLoginCtrl', ['$scope', '$cookies', '$location', function ($scope, $cookies, $location) {
		$scope.login = function() {
			$cookies.auth = 1;

			$location.path('/');
		}
	}])
	.controller('UserLogoutCtrl', ['$scope', '$cookies', '$location', function ($scope, $cookies, $location) {
		$cookies.auth = null;

		$location.path('/');
	}]);
