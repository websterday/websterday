'use strict';

angular.module('bookmarksApp')
	.factory('Link', ['$resource', 'WS', function($resource, WS) {
		return $resource(WS.url + '/links/:id?token=d5706126d87b1253d5550173fdd5e733', {}, {
			// get: {method:'GET', params:{id: '@id'}},
			// post: {method:'POST'},
			// put: {method:'PUT', params:{id: '@id'}},
			search: {method: 'GET', params:{value: '@value'}, url: WS.url + '/links/search/:value?token=d5706126d87b1253d5550173fdd5e733', isArray: true},
			list: {method: 'GET', url: WS.url + '/links?token=d5706126d87b1253d5550173fdd5e733', isArray: true},
		});
	}]);
