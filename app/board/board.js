'use strict';

angular.module('myApp.board', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/board', {
    templateUrl: 'board/board.html',
    controller: 'BoardCtrl'
  });
}])

.controller('BoardCtrl', [function($scope) {
  console.log('boardCtrl', this);
}]);
