angular.module('GeekCtrl', [])
.controller('GeekController', [ 'GeekService', '$routeParams', '$scope', function( GeekService, $routeParams, $scope ) {
	GeekService.getCountry($routeParams.countryCode).then(function(data) {
		$scope.countryData = data.geonames.country;
		$scope.country = $scope.countryData.countryName;
		$scope.area = $scope.countryData.areaInSqKm;
		$scope.pop = $scope.countryData.population;
	});
	GeekService.getCity($routeParams.countryCode, $routeParams.city).then(function(data) {
		$scope.cityData = data.geonames[0];
		$scope.city = $scope.cityData.toponymName;
		$scope.popCap = $scope.cityData.population;

	});
	GeekService.getNeighbors($routeParams.countryCode).then(function(data) {
		$scope.neighbordata = data.geonames.geoname;
		console.log(data.geonames);
		var count = Object.keys(data.geonames.geoname).length;
		$scope.noNeighbors = count;
	});
	$scope.country = $routeParams.countryCode;
}])
.factory('GeekService', ['$http', '$q', function($http, $q) {
	return{
	 	getCity: function( countryCode, city){
			var tcity =city.trim().replace(/ /g, '%20');
			return $http.get("http://api.geonames.org/searchJSON?name_equals=" + tcity + "&country=" +countryCode+"&maxRows=1&username=jsells")
			.then(function(res) {
				return $q.when(res.data);
			});
		},
		getCountry: function(countryCode){
			return $http.get("http://api.geonames.org/countryInfo?country="+countryCode+"&username=jsells")
			.then(function(res) {
				return $q.when(res.data);
			});
		},
		getNeighbors: function(countryCode){
			return $http.get("http://api.geonames.org/neighbours?country="+countryCode+"&username=jsells")
			.then(function(res) {
				return $q.when(res.data);
			});
		}
	};
}]);