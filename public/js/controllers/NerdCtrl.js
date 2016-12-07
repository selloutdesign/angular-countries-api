angular.module('NerdCtrl', [])
// .config(function ($httpProvider) {
//     $httpProvider.interceptors.push('xmlHttpInterceptor');
//  })
.controller('NerdController', [ '$scope', 'CountriesService', '$http', function($scope, CountriesService, $http) {

	$scope.tagline = 'Nothing beats a pocket protector!';
	$http.get("http://api.geonames.org/countryInfo?lang=en&username=jsells", {cache: true})
		.then(function(res) {
			$scope.countryData = res.data;
			console.log($scope.countryData);
		});

	// $http.get("http://api.geonames.org/countryInfo?lang=en&username=jsells")
	// 		.success(function(data, status, headers, config) {
	// 			var x2js = new X2JS();
	// 			var json = x2js.xml_str2json(data);
	// 			$scope.countryData = json;
	// 			console.log($scope.countryData);
	// 		})
	// 		.error(function(data, status, headers, config) {
	// 			alert('there is a problem');
	// 		});
}])
.factory('CountriesService', ['$http', '$q', function($http, $q) {
	return function(){
		return $http.get("http://api.geonames.org/countryInfo?lang=en&username=jsells")
		.then(function(res) {
			return $q.when(res.data);
		});
	};
}]);