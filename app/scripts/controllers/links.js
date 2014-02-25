'use strict';

angular.module('bookmarksApp')
	.controller('LinkSearchCtrl', ['$scope', 'Link', function ($scope, Link) {
		$scope.links = null;
		$scope.noResult = false;
		$scope.showLoading = false;

		$scope.search = function() {
			$scope.noResult = false;

			// console.log($scope.value);

			if ($scope.value != undefined && $scope.value != '') {
				$scope.showLoading = true;

				Link.search({value: $scope.value}, function(data) {
					$scope.showLoading = false;

					$scope.links = data;

					if ($scope.links.length == 0) {
						$scope.noResult = true;
					}
				});
			} else {
				$scope.links = null;
			}
		}
	}]);
