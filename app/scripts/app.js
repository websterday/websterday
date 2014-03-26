'use strict';

angular.module('bookmarksApp', [
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ui.bootstrap',
	'ngAnimate',
	'angular-growl'
])
	.config(function($routeProvider) {
		$routeProvider
		.when('/', {templateUrl: 'views/main.html', controller: 'MainCtrl', requireLogin: false})
		.when('/search', {templateUrl: 'views/links/search.html', controller: 'LinkSearchCtrl', requireLogin: true})
		.when('/links', {templateUrl: 'views/links/list.html', controller: 'LinkListCtrl', requireLogin: true})
		.when('/links/:folderId', {templateUrl: 'views/links/list.html', controller: 'LinkListCtrl', requireLogin: true})
		.when('/create-account', {templateUrl: 'views/users/add.html', controller: 'UserAddCtrl', requireLogin: false})
		.when('/sign-in', {templateUrl: 'views/users/login.html', controller: 'UserLoginCtrl', requireLogin: false})
		.when('/forgot-password', {templateUrl: 'views/users/forgotten_password.html', controller: 'UserForgottenPasswordCtrl', requireLogin: false})
		.when('/account', {templateUrl: 'views/users/account.html', controller: 'UserAccountCtrl', requireLogin: true})
		.when('/logout', {templateUrl: 'views/users/login.html', controller: 'UserLogoutCtrl', requireLogin: true})		// TODO delete templateUrl
		.when('/contact', {templateUrl: 'views/contact/index.html', controller: 'ContactCtrl', requireLogin: false})
		.when('/privacy_policy', {templateUrl: 'views/privacy_policy.html', controller: 'PrivacyPolicyCtrl', requireLogin: false})
		.when('/terms_of_service', {templateUrl: 'views/terms_service.html', controller: 'TermsServiceCtrl', requireLogin: false})
		.otherwise({redirectTo: '/', requireLogin: false});
	})
	.config(['growlProvider', function(growlProvider) {
		growlProvider.globalTimeToLive(3000);
	}])
	.run(['$rootScope', '$location', 'growl', 'Auth', function($rootScope, $location, growl, Auth) {
		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			Auth.check(next.requireLogin);

			// console.log(auth);
			// if (auth) {
			// 	$rootScope.isLogged = auth;
			// } else {
			// 	$location.path('/sign-in');
			// 	growl.addErrorMessage('Authentification required');
			// 	event.preventDefault();
			// }
		});
	}]);
