'use strict';

angular.module('bookmarksApp')
	.factory('Link', ['$resource', '$cookieStore', 'WS', function($resource, $cookieStore, WS) {
		return $resource(WS.url + '/links/:id?token=' + $cookieStore.get('token'), {}, {
			// get: {method:'GET', params:{id: '@id'}},
			// post: {method:'POST'},
			// put: {method:'PUT', params:{id: '@id'}},
			search: {method: 'GET', params:{value: '@value'}, url: WS.url + '/links/search/:value?token=' + $cookieStore.get('token')},
			list: {method: 'GET', url: WS.url + '/links/folder/:folderId?token=' + $cookieStore.get('token')}
		});
	}]);
