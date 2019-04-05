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
    { name: '5 set', list: rankingService.get()['5'] },
    { name: '10 set', list: rankingService.get()['10'] }
  ];

}]);
