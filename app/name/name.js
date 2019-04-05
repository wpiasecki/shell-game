'use strict';

angular.module('myApp.name', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/name', {
    templateUrl: 'name/name.html',
    controller: 'NameCtrl',
    bindings: { $router: '<' }
  });
}])

.controller('NameCtrl', function($scope, $location) {
  var ctrl = this;
  
  $scope.playername;
  $scope.setSize = '10set';
  
  $scope.startGame = function() {
    $location.path('board/' + $scope.setSize + "/" + $scope.playername);
  }
});
