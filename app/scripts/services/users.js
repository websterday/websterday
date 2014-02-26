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
	.factory('User', ['$resource', function($resource) {
		return $resource('http://localhost:8888/BookmarksWS/links/:id?token=d5706126d87b1253d5550173fdd5e733', {}, {
			// get: {method:'GET', params:{id: '@id'}},
			// post: {method:'POST'},
			// put: {method:'PUT', params:{id: '@id'}},
			authenticate: {method: 'POST', url: 'http://localhost:8888/BookmarksWS/users/authenticate'}
		});
	}]);
