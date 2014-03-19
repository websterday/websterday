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
		$scope.checked = {'folders': {}, 'links': {}};

		$scope.allLinks = false;

		$scope.folderChecked = false;

		$scope.linkChecked = false;

		$scope.showMoveButton      = false;
		$scope.showDuplicateButton = false;
		$scope.showEditButton      = false;
		$scope.showDeleteButton    = false;

		// $scope.folderId = $routeParams.folderId;

		Link.list({folderId: $routeParams.folderId}, function(data) {
			// $scope.showLoading = false;

			$scope.tree = data;
		});

		$scope.redirect = function(url, event) {
			// if (event.target.attributes.length == 0) {
				$location.path(url);
			// }
		}

		$scope.checkLine = function(id, type) {
			if (!$scope.checked[type][id]) {
				$scope.checked[type][id] = true;
			} else {
				$scope.checked[type][id] = false;
			}
		}

		$scope.checkAll = function() {
			var value = !$scope.allLinks;
			angular.forEach($scope.tree.folders, function(f) {
				$scope.checked['folders'][f.id] = value;
			});
			angular.forEach($scope.tree.links, function(t) {
				$scope.checked['links'][t.id] = value;
			});
		}

		$scope.check = function(id, type, event) {
			var input = !$scope.checked[type][id];

			var nbItemsChecked = 0;

			angular.forEach($scope.checked['folders'], function(f) {
				if (f) {
					nbItemsChecked++;
				}
			});
			angular.forEach($scope.checked['links'], function(f) {
				if (f) {
					nbItemsChecked++;
				}
			});

			if (input || nbItemsChecked > 1) {
				$scope.showMoveButton   = true;
				$scope.showDeleteButton = true;
			} else {
				$scope.showMoveButton   = false;
				$scope.showDeleteButton = false;
			}

			if ((input && nbItemsChecked == 0) || (!input && nbItemsChecked == 2)) {
				$scope.showDuplicateButton = true;
				$scope.showEditButton      = true;
			} else {
				$scope.showDuplicateButton = false;
				$scope.showEditButton      = false;
			}

			event.stopPropagation();
		}

		$scope.addModal = function() {
			var modalInstance = $modal.open({
				templateUrl: 'views/links/add.html',
				controller: function($scope, $modalInstance, folderId) {
					$scope.link = {'name': 'ddddd'};

					$scope.save = function() {
						console.log($scope.link.name);
						// Link.post({link: link, folderId: $routeParams.folderId}, function(data) {

						// });
						$modalInstance.close();
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				resolve: {
					folderId: function () {
						return $routeParams.folderId;
					}
				}
			});
		};

		$scope.addFolderModal = function() {
			var modalInstance = $modal.open({
				templateUrl: 'views/links/add_folder.html',
				controller: function($scope, $modalInstance, folderId) {
					
					$scope.save = function() {
						console.log($scope.link.name);
						// Link.post({link: link, folderId: $routeParams.folderId}, function(data) {

						// });
						$modalInstance.close();
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				resolve: {
					folderId: function () {
						return $routeParams.folderId;
					}
				}
			});
		};

		$scope.deleteModal = function() {
			var modalInstance = $modal.open({
				templateUrl: 'views/links/delete.html',
				controller: function($scope, $modalInstance) {
					
					$scope.delete = function() {
						$modalInstance.close();
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				// resolve: {
				// 	folderId: function () {
				// 		return $routeParams.folderId;
				// 	}
				// }
			});
		};
	}]);