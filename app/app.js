'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.header',
  'myApp.board',
  'myApp.name',
  'myApp.ranking',
  'myApp.version',
  'myApp.rankingService',
  'ngDialog',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/name'});
}]);
