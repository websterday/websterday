'use strict';

angular.module('bookmarksApp', [
	'ngCookies',
	'ngResource',
	'ngRoute'
])
	.config(function ($routeProvider) {
		$routeProvider
		.when('/', {templateUrl: 'views/main.html', controller: 'MainCtrl'})
		.when('/search', {templateUrl: 'views/links/search.html', controller: 'LinkSearchCtrl'})
		.when('/create-account', {templateUrl: 'views/users/add.html', controller: 'UserAddCtrl'})
		.when('/sign-in', {templateUrl: 'views/users/login.html', controller: 'UserLoginCtrl'})
		// .when('/my-account', {templateUrl: 'views/users/account.html', controller: 'UserAccountCtrl'})
		.when('/logout', {templateUrl: 'views/users/login.html', controller: 'UserLogoutCtrl'})		// TODO delete templateUrl
		.otherwise({redirectTo: '/'});
	})
	.run(function($rootScope) {
		$rootScope.isLogged = true;
		// $rootScope.isLogged = false;
	});
