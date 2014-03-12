'use strict';

angular.module('bookmarksApp')
	.factory('WS', function () {
		return {
			url: '/BookmarksWS'
			// url: '/ws'
		};
	});