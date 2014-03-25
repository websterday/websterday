'use strict';

angular.module('bookmarksApp')
	.controller('MainCtrl', ['$scope', '$cookieStore', function ($scope, $cookieStore) {
		// console.log($cookieStore.get('auth'));
	}])
	.controller('PrivacyPolicyCtrl', function () {})
	.controller('TermsServiceCtrl', function () {});
