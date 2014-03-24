'use strict';

angular.module('bookmarksApp')
	.factory('WS', function () {
		return {
			// url: '/WebsterdayWS'
			url: '/ws'
		};
	});