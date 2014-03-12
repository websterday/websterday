'use strict';

angular.module('bookmarksApp')
	.factory('Auth', ['$cookieStore', function($cookieStore) {
		return {
			check: function() {
				if ($cookieStore.get('token') != undefined) {
					return true;
				} else {
					return false;
				}
			}
		}
	}])
	.factory('User', ['$resource', '$cookieStore', 'WS', function($resource, $cookieStore, WS) {
		return $resource(WS.url + '/users/:id?token=' + $cookieStore.get('token'), {}, {
			// get: {method:'GET', params:{id: '@id'}},
			// put: {method:'PUT', params:{id: '@id'}},
			authenticate: {method: 'POST', url: WS.url + '/users/authenticate'}
		});
	}]);
