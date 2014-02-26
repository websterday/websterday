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
		.when('/links', {templateUrl: 'views/links/list.html', controller: 'LinkListCtrl'})
		.when('/create-account', {templateUrl: 'views/users/add.html', controller: 'UserAddCtrl'})
		.when('/sign-in', {templateUrl: 'views/users/login.html', controller: 'UserLoginCtrl'})
		// .when('/my-account', {templateUrl: 'views/users/account.html', controller: 'UserAccountCtrl'})
		.when('/logout', {templateUrl: 'views/users/login.html', controller: 'UserLogoutCtrl'})		// TODO delete templateUrl
		.otherwise({redirectTo: '/'});
	})
	.run(['$rootScope', 'Auth', function($rootScope, Auth) {
		$rootScope.$on('$routeChangeStart', function() {
			$rootScope.isLogged = Auth.check();
		});
		// $rootScope.isLogged = false;
	}]);
