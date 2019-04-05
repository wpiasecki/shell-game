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
  
  console.log('nameCtrl', this, $scope, $location);
  
  $scope.playername;
  $scope.setSize = '5set';
  
  $scope.startGame = function() {
    console.log('startGame', this);
    //this.$router.navigate(['myApp.board']);
    $location.path('board/' + $scope.setSize + "/" + $scope.playername);
  }
});
