'use strict';

angular.module('myApp.ranking', ['ngRoute', 'myApp.rankingService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ranking', {
    templateUrl: 'ranking/ranking.html',
    controller: 'RankingCtrl'
  });
}])

.controller('RankingCtrl', ['$scope', 'rankingService', function($scope, rankingService) {
  var ctrl = this;
  console.log('rankingCtrl', this, $scope, rankingService);
  $scope.sets = [
    { name: '5 pares', list: rankingService.get()['5set'] },
    { name: '10 pares', list: rankingService.get()['10set'] }
  ];

}]);