'use strict';

angular.module('bookmarksApp')
	.controller('LinkSearchCtrl', ['$scope', '$location', 'Link', function($scope, $location, Link) {
		$scope.links = null;
		$scope.noResult = false;
		$scope.showLoading = false;

		$scope.search = function() {
			$scope.noResult = false;

			if ($scope.value !== undefined && $scope.value !== '') {
				$scope.showLoading = true;

				Link.search({value: $scope.value}, function(data) {
					$scope.showLoading = false;

					$scope.links = data;

					if ($scope.links.length === 0) {
						$scope.noResult = true;
					}
				});
			} else {
				$scope.links = null;
			}
		};

		$scope.redirect = function(url, event) {
			// console.log(url);
			// $location.path(url);
			event.stopPropagation();
		};
	}])
	.controller('LinkListCtrl', ['$scope', '$routeParams', '$location', '$modal', 'growl', 'Link', 'Folder', function($scope, $routeParams, $location, $modal, growl, Link, Folder) {
		$scope.checked = {'folders': {}, 'links': {}};

		$scope.allLinks = false;

		$scope.folderChecked = false;

		$scope.linkChecked = false;

		$scope.showMoveButton      = false;
		$scope.showDeleteButton    = false;

		// $scope.folderId = $routeParams.folderId;

		Link.list({folderId: $routeParams.folderId}, function(data) {
			// $scope.showLoading = false;

			$scope.links = data;
		});

		$scope.redirect = function(url) {
			// if (event.target.attributes.length == 0) {
			$location.path(url);
			// }
		};

		// $scope.checkLine = function(id, type) {
		// 	if (!$scope.checked[type][id]) {
		// 		$scope.checked[type][id] = true;
		// 	} else {
		// 		$scope.checked[type][id] = false;
		// 	}
		// };

		// $scope.checkAll = function() {
		// 	var value = !$scope.allLinks;
		// 	angular.forEach($scope.tree.folders, function(f) {
		// 		$scope.checked.folders[f.id] = value;
		// 	});
		// 	angular.forEach($scope.tree.links, function(t) {
		// 		$scope.checked.links[t.id] = value;
		// 	});

		// 	if (value) {
		// 		$scope.showMoveButton   = true;
		// 		$scope.showDeleteButton = true;
		// 	} else {
		// 		$scope.showMoveButton   = false;
		// 		$scope.showDeleteButton = false;
		// 	}
		// };

		// $scope.check = function(id, type, event) {
		// 	var input = !$scope.checked[type][id];

		// 	var nbItemsChecked = Object.keys($scope.checked['folders']).length + Object.keys($scope.checked['links']).length;
		// 	var nbItemsTotal = Object.keys($scope.tree['folders']).length + Object.keys($scope.tree['links']).length;

		// 	// console.log(nbItemsChecked + ' - ' + nbItemsTotal);

		// 	if (input || nbItemsChecked > 1) {
		// 		$scope.showMoveButton   = true;
		// 		$scope.showDeleteButton = true;
		// 	} else {
		// 		$scope.showMoveButton   = false;
		// 		$scope.showDeleteButton = false;
		// 	}

		// 	// check if we have to check the "all checkbox"
		// 	if (input && nbItemsChecked >= nbItemsTotal - 1) {
		// 		$scope.allLinks = true;
		// 	} else if (!input && $scope.allLinks) {
		// 		$scope.allLinks = false;
		// 	}

		// 	event.stopPropagation();
		// };

		// $scope.moveLink = function(id, event) {
		// 	$scope.moveLinkModal(id);

		// 	event.stopPropagation();
		// };

		// $scope.duplicateLink = function(id, event) {
		// 	$scope.duplicateLinkModal(id);

		// 	event.stopPropagation();
		// };

		// $scope.editLink = function(id, url, date, event) {
		// 	var link = {'id': id, 'url': url, 'date': date};
		// 	$scope.editLinkModal(link);

		// 	event.stopPropagation();
		// };

		// $scope.deleteLink = function(id, event) {
		// 	// console.log('delete link ' + id);

		// 	$scope.deleteLinkModal(id);

		// 	event.stopPropagation();
		// };

		// $scope.moveFolder = function(id, event) {
		// 	$scope.moveFolderModal(id);

		// 	event.stopPropagation();
		// };

		// $scope.duplicateFolder = function(id, event) {
		// 	$scope.duplicateFolderModal(id);

		// 	event.stopPropagation();
		// };

		// $scope.editFolder = function(id, name, date, event) {
		// 	var folder = {'id': id, 'name': name, 'date': date};
		// 	$scope.editFolderModal(folder);

		// 	event.stopPropagation();
		// };

		// $scope.deleteFolder = function(id, event) {
		// 	// console.log('delete folder ' + id);

		// 	$scope.deleteFolderModal(id);

		// 	event.stopPropagation();
		// };

		/**
		 * Show modal to add a link
		 */
		$scope.addLinkModal = function() {
			var modalInstance = $modal.open({
				templateUrl: 'views/links/modal/add.html',
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
					$scope.links.push(link);
				}
			});
		};

		// /**
		//  * Show a modal to move a link
		//  * @param  {[type]} id [description]
		//  * @return {[type]}    [description]
		//  */
		// $scope.moveLinkModal = function(id) {
		// 	var modalInstance = $modal.open({
		// 		templateUrl: 'views/links/modal/move.html',
		// 		controller: function($scope, $modalInstance) {

		// 			$scope.move = function() {
		// 				// Link.move({id: id}, function(data) {
		// 				// 	console.log(data);
		// 					// if (angular.isUndefined(data.error)) {
		// 					// 	$modalInstance.close(id);
		// 					// } else {
		// 					// 	$modalInstance.close();

		// 					// 	growl.addErrorMessage(data.error);
		// 					// }
		// 				// });
		// 			};

		// 			$scope.cancel = function() {
		// 				$modalInstance.dismiss('cancel');
		// 			};
		// 		}
		// 	});

		// 	modalInstance.result.then(function(id) {
		// 		// if (angular.isDefined(id)) {
		// 		// 	angular.forEach($scope.tree['links'], function(l, k) {
		// 		// 		if (l.id == id) {
		// 		// 			$scope.tree['links'].splice(k, 1);
		// 		// 		}
		// 		// 	});
		// 		// }
		// 	});
		// };

		// /**
		//  * Show a modal to duplicate a link
		//  * @param  {[type]} id [description]
		//  * @return {[type]}    [description]
		//  */
		// $scope.duplicateLinkModal = function(id) {
		// 	var modalInstance = $modal.open({
		// 		templateUrl: 'views/links/modal/duplicate.html',
		// 		controller: function($scope, $modalInstance) {

		// 			$scope.duplicate = function() {
		// 				// Link.duplicate({id: id}, function(data) {
		// 				// 	console.log(data);
		// 					// if (angular.isUndefined(data.error)) {
		// 					// 	$modalInstance.close(id);
		// 					// } else {
		// 					// 	$modalInstance.close();

		// 					// 	growl.addErrorMessage(data.error);
		// 					// }
		// 				// });
		// 			};

		// 			$scope.cancel = function() {
		// 				$modalInstance.dismiss('cancel');
		// 			};
		// 		}
		// 	});

		// 	modalInstance.result.then(function(id) {
		// 		// if (angular.isDefined(id)) {
		// 		// 	angular.forEach($scope.tree['links'], function(l, k) {
		// 		// 		if (l.id == id) {
		// 		// 			$scope.tree['links'].splice(k, 1);
		// 		// 		}
		// 		// 	});
		// 		// }
		// 	});
		// };

		// /**
		//  * Show the modal to edit a link
		//  * @param  {[type]} id [description]
		//  * @return {[type]}    [description]
		//  */
		// $scope.editLinkModal = function(link) {
		// 	var modalInstance = $modal.open({
		// 		templateUrl: 'views/links/modal/edit.html',
		// 		controller: function($scope, $modalInstance) {

		// 			$scope.link = link;
					
		// 			$scope.save = function() {
		// 				Link.put({id: $scope.link.id, url: $scope.link.url}, function(data) {
		// 					console.log(data);
		// 					if (angular.isUndefined(data.error)) {
		// 						$modalInstance.close($scope.link);
		// 					} else {
		// 						$modalInstance.close();
		// 						growl.addErrorMessage(data.error);
		// 					}
		// 				});
		// 			};

		// 			$scope.cancel = function() {
		// 				$modalInstance.dismiss('cancel');
		// 			}
		// 		}
		// 	});

		// 	modalInstance.result.then(function(link) {
		// 		if (angular.isDefined(link)) {
		// 			angular.forEach($scope.tree['links'], function(l, k) {
		// 				if (l.id == link.id) {
		// 					$scope.tree['links'][k] = link;
		// 				}
		// 			});
		// 		}
		// 	});
		// };

		// /**
		//  * Show and manage the delete modal
		//  * @param  {[type]} id [description]
		//  * @return {[type]}    [description]
		//  */
		// $scope.deleteLinkModal = function(id) {
		// 	var modalInstance = $modal.open({
		// 		templateUrl: 'views/links/modal/delete.html',
		// 		controller: function($scope, $modalInstance) {

		// 			$scope.delete = function() {
		// 				Link.delete({id: id}, function(data) {
		// 					if (angular.isUndefined(data.error)) {
		// 						$modalInstance.close(id);
		// 					} else {
		// 						$modalInstance.close();

		// 						growl.addErrorMessage(data.error);
		// 					}
		// 				});
		// 			};

		// 			$scope.cancel = function() {
		// 				$modalInstance.dismiss('cancel');
		// 			};
		// 		}
		// 	});

		// 	modalInstance.result.then(function(id) {
		// 		if (angular.isDefined(id)) {
		// 			angular.forEach($scope.tree['links'], function(l, k) {
		// 				if (l.id == id) {
		// 					$scope.tree['links'].splice(k, 1);
		// 				}
		// 			});
		// 		}
		// 	});
		// };

		// /**
		//  * Show the modal to add a folder
		//  */
		// $scope.addFolderModal = function() {
		// 	var modalInstance = $modal.open({
		// 		templateUrl: 'views/links/modal/folders/add.html',
		// 		controller: function($scope, $modalInstance, folderId) {
		// 			$scope.folder = {};
					
		// 			$scope.save = function() {
		// 				Folder.post({name: $scope.folder.name, parent_id: $routeParams.folderId}, function(data) {
		// 					if (angular.isDefined(data.folder)) {
		// 						$modalInstance.close(data.folder);
		// 					} else if (angular.isDefined(data.error)) {
		// 						$modalInstance.close();
		// 						growl.addErrorMessage(data.error);
		// 					}
		// 				});
		// 			};

		// 			$scope.cancel = function() {
		// 				$modalInstance.dismiss('cancel');
		// 			};
		// 		},
		// 		resolve: {
		// 			folderId: function() {
		// 				return $routeParams.folderId;
		// 			}
		// 		}
		// 	});

		// 	modalInstance.result.then(function(folder) {
		// 		if (angular.isDefined(folder)) {
		// 			$scope.tree['folders'].push(folder);
		// 		}
		// 	});
		// };

		// $scope.moveFolderModal = function(id) {
		// 	var modalInstance = $modal.open({
		// 		templateUrl: 'views/links/modal/folders/move.html',
		// 		controller: function($scope, $modalInstance) {

		// 			$scope.move = function() {
		// 				// Folder.move({id: id}, function(data) {
		// 					// if (angular.isUndefined(data.error)) {
		// 					// 	$modalInstance.close(id);
		// 					// } else {
		// 					// 	$modalInstance.close();

		// 					// 	growl.addErrorMessage(data.error);
		// 					// }
		// 				// });
		// 			};

		// 			$scope.cancel = function() {
		// 				$modalInstance.dismiss('cancel');
		// 			};
		// 		}
		// 	});

		// 	modalInstance.result.then(function(id) {
		// 		// if (angular.isDefined(id)) {
		// 		// 	angular.forEach($scope.tree['folders'], function(l, k) {
		// 		// 		if (l.id == id) {
		// 		// 			$scope.tree['folders'].splice(k, 1);
		// 		// 		}
		// 		// 	});
		// 		// }
		// 	});
		// };

		// $scope.duplicateFolderModal = function(id) {
		// 	var modalInstance = $modal.open({
		// 		templateUrl: 'views/links/modal/folders/duplicate.html',
		// 		controller: function($scope, $modalInstance) {

		// 			$scope.duplicate = function() {
		// 				// Folder.duplicate({id: id}, function(data) {
		// 					// if (angular.isUndefined(data.error)) {
		// 					// 	$modalInstance.close(id);
		// 					// } else {
		// 					// 	$modalInstance.close();

		// 					// 	growl.addErrorMessage(data.error);
		// 					// }
		// 				// });
		// 			};

		// 			$scope.cancel = function() {
		// 				$modalInstance.dismiss('cancel');
		// 			};
		// 		}
		// 	});

		// 	modalInstance.result.then(function(id) {
		// 		// if (angular.isDefined(id)) {
		// 		// 	angular.forEach($scope.tree['folders'], function(l, k) {
		// 		// 		if (l.id == id) {
		// 		// 			$scope.tree['folders'].splice(k, 1);
		// 		// 		}
		// 		// 	});
		// 		// }
		// 	});
		// };

		// /**
		//  * Show the modal to edit a folder
		//  * @param  {[type]} folder [description]
		//  * @return {[type]}        [description]
		//  */
		// $scope.editFolderModal = function(folder) {
		// 	var modalInstance = $modal.open({
		// 		templateUrl: 'views/links/modal/folders/edit.html',
		// 		controller: function($scope, $modalInstance, folder) {
		// 			$scope.folder = folder;

		// 			$scope.save = function() {
		// 				Folder.put({id: $scope.folder.id, name: $scope.folder.name}, function(data) {
		// 					if (angular.isUndefined(data.error)) {
		// 						$modalInstance.close($scope.folder);
		// 					} else if (angular.isDefined(data.error)) {
		// 						$modalInstance.close();
		// 						growl.addErrorMessage(data.error);
		// 					}
		// 				});
		// 			};

		// 			$scope.cancel = function() {
		// 				$modalInstance.dismiss('cancel');
		// 			};
		// 		},
		// 		resolve: {
		// 			folder: function() {
		// 				return folder;
		// 			}
		// 		}
		// 	});

		// 	modalInstance.result.then(function(folder) {
		// 		if (angular.isDefined(folder)) {
		// 			angular.forEach($scope.tree['folders'], function(l, k) {
		// 				if (l.id == folder.id) {
		// 					$scope.tree['folders'][k] = folder;
		// 				}
		// 			});
		// 		}
		// 	});
		// };

		// /**
		//  * Show and manage the delete modal
		//  * @param  {[type]} id [description]
		//  * @return {[type]}    [description]
		//  */
		// $scope.deleteFolderModal = function(id) {
		// 	var modalInstance = $modal.open({
		// 		templateUrl: 'views/links/modal/folders/delete.html',
		// 		controller: function($scope, $modalInstance) {

		// 			$scope.delete = function() {
		// 				Folder.delete({id: id}, function(data) {
		// 					if (angular.isUndefined(data.error)) {
		// 						$modalInstance.close(id);
		// 					} else {
		// 						$modalInstance.close();

		// 						growl.addErrorMessage(data.error);
		// 					}
		// 				});
		// 			};

		// 			$scope.cancel = function() {
		// 				$modalInstance.dismiss('cancel');
		// 			};
		// 		}
		// 	});

		// 	modalInstance.result.then(function(id) {
		// 		if (angular.isDefined(id)) {
		// 			angular.forEach($scope.tree['folders'], function(l, k) {
		// 				if (l.id == id) {
		// 					$scope.tree['folders'].splice(k, 1);
		// 				}
		// 			});
		// 		}
		// 	});
		// };

		// /**
		//  * Show and manage the delete modal for selected links
		//  * @param  {[type]} id [description]
		//  * @return {[type]}    [description]
		//  */
		// $scope.deleteMultipleModal = function() {
		// 	var modalInstance = $modal.open({
		// 		templateUrl: 'views/links/modal/delete_multiple.html',
		// 		controller: function($scope, $modalInstance, list) {

		// 			$scope.delete = function() {
		// 				Link.deleteMultiple({list: list}, function(data) {
		// 					if (angular.isUndefined(data.error)) {
		// 						$modalInstance.close(list);
		// 					} else {
		// 						$modalInstance.close();

		// 						growl.addErrorMessage(data.error);
		// 					}
		// 				});
		// 			};

		// 			$scope.cancel = function() {
		// 				$modalInstance.dismiss('cancel');
		// 			};
		// 		},
		// 		resolve: {
		// 			list: function() {
		// 				return $scope.checked;
		// 			}
		// 		}
		// 	});

		// 	modalInstance.result.then(function(list) {
		// 		if (angular.isDefined(list)) {
		// 			angular.forEach(list['folders'], function(f, k) {
		// 				angular.forEach($scope.tree['folders'], function(f2, k2) {
		// 					if (f2.id == k) {
		// 						$scope.tree['folders'].splice(k2, 1);
		// 					}
		// 				});
		// 			});

		// 			angular.forEach(list['links'], function(l, k) {
		// 				angular.forEach($scope.tree['links'], function(l2, k2) {
		// 					if (l2.id == k) {
		// 						$scope.tree['links'].splice(k2, 1);
		// 					}
		// 				});
		// 			});
		// 		}
		// 	});
		// };
	}]);