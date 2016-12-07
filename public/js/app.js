angular.module('sampleApp', ['xml', 'ngRoute', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService'])
.config(function ($httpProvider) {
	$httpProvider.interceptors.push('xmlHttpInterceptor');
});