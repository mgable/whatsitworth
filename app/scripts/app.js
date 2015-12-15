'use strict';

/**
* @ngdoc overview
* @name whatsitworth
* @description
* # whatsitworth
*
* Main module of the application.
*/
angular.module('whatsitworth', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
	'ui.bootstrap',
	'ui.utils',
	'kendo.directives'
])
.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/simple');

	$stateProvider
		.state('Search',{
			abstract: true,
			templateUrl: 'views/search.html',
			controller: 'SearchCtrl',
		})
		.state('Search.simple', {
			url: '/simple',
			templateUrl: 'views/simple.html',
			controller: 'SimpleCtrl',
		})
		.state('Search.advanced', {
			url: '/advanced',
			templateUrl: 'views/advanced.html',
			controller: 'AdvancedCtrl',
			resolve: {
				Stats: function(DataStats){return DataStats.get();}
			}
		});
});
