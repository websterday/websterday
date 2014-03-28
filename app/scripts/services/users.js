'use strict';

angular.module('bookmarksApp')
	.factory('Auth', ['$rootScope', '$cookieStore', '$location', 'growl', 'User', function($rootScope, $cookieStore, $location, growl, User) {
		return {
			check: function(requireLogin) {
				if ($cookieStore.get('id') != undefined && $cookieStore.get('token') != undefined) {
					User.checkAuth({id: $cookieStore.get('id'), token: $cookieStore.get('token')}, function(data) {
						if (data[0] == 1) {
							$rootScope.isLogged = true;
						} else {
							$rootScope.isLogged = false;
						}

						if (requireLogin && !$rootScope.isLogged) {
							$location.path('/sign-in');
							growl.addErrorMessage('Authentification required');
						}
					});
				} else {
					$rootScope.isLogged = false;

					if (requireLogin && !$rootScope.isLogged) {
						$location.path('/sign-in');
						growl.addErrorMessage('Authentification required');
					}
				}

				// console.log($rootScope.isLogged);
			}
		}
	}])
	.factory('User', ['$resource', '$cookieStore', 'WS', function($resource, $cookieStore, WS) {
		return $resource(WS.url + '/users/:id?token=' + $cookieStore.get('token'), {}, {
			get: {method:'GET', params:{id: '@id'}},
			post: {method:'POST', url: WS.url + '/users'},
			// put: {method:'PUT', params:{id: '@id'}},
			authenticate: {method: 'POST', url: WS.url + '/users/authenticate'},
			checkAuth: {method: 'GET', url: WS.url + '/users/check-auth/:id/:token'},
			forgottenPassword: {method: 'GET', url: WS.url + '/users/forgotten-password/:email'},
		});
	}]);
