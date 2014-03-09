'use strict';

angular.module('bookmarksApp')
	.factory('Link', ['$resource', function($resource) {
		return $resource('http://localhost/BookmarksWS/links/:id?token=d5706126d87b1253d5550173fdd5e733', {}, {
			// get: {method:'GET', params:{id: '@id'}},
			// post: {method:'POST'},
			// put: {method:'PUT', params:{id: '@id'}},
			search: {method: 'GET', params:{value: '@value'}, url: 'http://localhost:8888/BookmarksWS/links/search/:value?token=d5706126d87b1253d5550173fdd5e733', isArray: true},
			list: {method: 'GET', url: 'http://localhost:8888/BookmarksWS/links?token=d5706126d87b1253d5550173fdd5e733', isArray: true},
		});
	}]);
