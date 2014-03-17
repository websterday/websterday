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
	.controller('LinkListCtrl', ['$scope', '$routeParams', '$location', '$modal', 'Link', function($scope, $routeParams, $location, $modal, Link) {
		// $scope.showLoading = true;
		// $scope.showLinks = {};

		Link.list({folderId: $routeParams.folderId}, function(data) {
			// $scope.showLoading = false;

			$scope.tree = data;
		});

		$scope.redirect = function(url, event) {
			// if (event.target.attributes.length == 0) {
				$location.path(url);
			// }
		}

		$scope.addModal = function () {
			var modalInstance = $modal.open({
				templateUrl: 'views/links/add.html',
				controller: function ($scope, $modalInstance) {
					$scope.save = function () {
						console.log($routeParams.folderId);
						console.log($scope.link);
						// Link.post({link: $scope.link, folderId: $routeParams.folderId}, function(data) {

						// });
						$modalInstance.close();
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				}
			});

			// modalInstance.result.then(function (selectedItem) {
			// 	$scope.selected = selectedItem;
			// }, function () {
			// 	$log.info('Modal dismissed at: ' + new Date());
			// });
		};
	}]);