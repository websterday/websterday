'use strict';

angular.module('bookmarksApp')
	.controller('LinkSearchCtrl', ['$scope', 'Link', function($scope, Link) {
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
	}])
	.controller('LinkListCtrl', ['$scope', 'Link', function($scope, Link) {
		// $scope.showLoading = true;
		$scope.showLinks = {};

		Link.list(function(data) {
			// $scope.showLoading = false;

			$scope.tree = data;

			// used to know if we have to show the links of each folder
			angular.forEach($scope.tree, function(t, k) {
				$scope.showLinks[t.id] = false;
			});
		})

		$scope.changeShowLinks = function(id) {
			if (!$scope.showLinks[id]) {
				$scope.showLinks[id] = true;
			} else {
				$scope.showLinks[id] = false;
			}
		}
	}]);
