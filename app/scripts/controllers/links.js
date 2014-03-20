'use strict';

angular.module('bookmarksApp')
	.controller('LinkSearchCtrl', ['$scope', 'Link', function($scope, Link) {
		$scope.links = null;
		$scope.noResult = false;
		$scope.showLoading = false;

		$scope.search = function() {
			$scope.noResult = false;

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
	.controller('LinkListCtrl', ['$scope', '$routeParams', '$location', '$modal', 'growl', 'Link', 'Folder', function($scope, $routeParams, $location, $modal, growl, Link, Folder) {
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

		$scope.editFolder = function(id, name, event) {
			var folder = {'id': id, 'name': name};
			$scope.editFolderModal(folder);

			event.stopPropagation();
		}

		$scope.deleteFolder = function(id, event) {
			console.log('delete folder ' + id);

			$scope.deleteModal(id);

			event.stopPropagation();
		}

		$scope.editLink = function(id, event) {
			console.log('edit link ' + id);

			$scope.editLinkModal(id);

			event.stopPropagation();
		}

		$scope.deleteLink = function(id, event) {
			console.log('delete link ' + id);

			$scope.deleteLinkModal(id);

			event.stopPropagation();
		}

		/**
		 * Show modal to add a link
		 */
		$scope.addLinkModal = function() {
			var modalInstance = $modal.open({
				templateUrl: 'views/links/add.html',
				controller: function($scope, $modalInstance, folderId) {
					$scope.link = {};

					$scope.save = function() {
						Link.post({url: $scope.link.url, folder_id: $routeParams.folderId}, function(data) {
							if (angular.isDefined(data.link)) {
								$modalInstance.close(data.link);
							} else if (angular.isDefined(data.error)) {
								$modalInstance.close();
								growl.addErrorMessage(data.error);
							}
							
						});
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

			modalInstance.result.then(function(link) {
				if (angular.isDefined(link)) {
					$scope.tree['links'].push(link);
				}
			}, function () {
				// $log.info('Modal dismissed at: ' + new Date());
			});
		};

		/**
		 * Show the modal to add a folder
		 */
		$scope.addFolderModal = function() {
			var modalInstance = $modal.open({
				templateUrl: 'views/links/add_folder.html',
				controller: function($scope, $modalInstance, folderId) {
					$scope.folder = {};
					
					$scope.save = function() {
						Folder.post({name: $scope.folder.name, parent_id: $routeParams.folderId}, function(data) {
							if (angular.isDefined(data.folder)) {
								$modalInstance.close(data.folder);
							} else if (angular.isDefined(data.error)) {
								$modalInstance.close();
								growl.addErrorMessage(data.error);
							}
						});
					};

					$scope.cancel = function() {
						$modalInstance.dismiss('cancel');
					};
				},
				resolve: {
					folderId: function() {
						return $routeParams.folderId;
					}
				}
			});

			modalInstance.result.then(function(folder) {
				if (angular.isDefined(folder)) {
					$scope.tree['folders'].push(folder);
				}
			}, function () {
				// $log.info('Modal dismissed at: ' + new Date());
			});
		};

		/**
		 * Show the modal to edit a folder
		 * @param  {[type]} folder [description]
		 * @return {[type]}        [description]
		 */
		$scope.editFolderModal = function(folder) {
			var modalInstance = $modal.open({
				templateUrl: 'views/links/edit_folder.html',
				controller: function($scope, $modalInstance, folder) {
					$scope.folder = folder;

					$scope.save = function() {
						Folder.put({id: $scope.folder.id, name: $scope.folder.name}, function(data) {
							// TODO manage errors

							$modalInstance.close();
						});
					};

					$scope.cancel = function() {
						$modalInstance.dismiss('cancel');
					};
				},
				resolve: {
					folder: function() {
						return folder;
					}
				}
			});
		};

		/**
		 * Show the modal to edit a link
		 * @param  {[type]} id [description]
		 * @return {[type]}    [description]
		 */
		$scope.editLinkModal = function(id) {
			var modalInstance = $modal.open({
				templateUrl: 'views/links/edit.html',
				controller: function($scope, $modalInstance) {
					
					$scope.save = function() {
						$modalInstance.close();
					};

					$scope.cancel = function() {
						$modalInstance.dismiss('cancel');
					};
				},
				// resolve: {
				// 	folderId: function() {
				// 		return $routeParams.folderId;
				// 	}
				// }
			});
		};

		/**
		 * Show and manage the delete modal
		 * @param  {[type]} id [description]
		 * @return {[type]}    [description]
		 */
		$scope.deleteLinkModal = function(id) {
			var modalInstance = $modal.open({
				templateUrl: 'views/links/delete.html',
				controller: function($scope, $modalInstance) {

					$scope.delete = function() {
						Link.delete({id: id}, function(data) {
							if (angular.isUndefined(data.error)) {
								$modalInstance.close(id);
							} else {
								$modalInstance.close();

								growl.addErrorMessage(data.error);
							}
						});
					};

					$scope.cancel = function() {
						$modalInstance.dismiss('cancel');
					};
				}
			});

			modalInstance.result.then(function(id) {
				if (angular.isDefined(id)) {
					angular.forEach($scope.tree['links'], function(l, k) {
						if (l.id == id) {
							$scope.tree['links'].splice(k, 1);
						}
					});
				}
			});

		};
	}]);