'use strict';

function HeaderCtrl($scope, $element, $attrs, ngDialog) {
  var ctrl = this;
  console.log('headerCtrl', ctrl, $scope, $element, $attrs, ngDialog);
  
  $scope.showRanking = () => 
    ngDialog.open({ 
      template: 'ranking/ranking.html', 
      className: 'ngdialog-theme-default',
      controller: 'RankingCtrl'
    });
}

angular.module('myApp.header', ['ngRoute', 'ngDialog']).component('header', {
  templateUrl: 'header/header.html',
  bindings: {
    params: '='
  },
  controller: HeaderCtrl,
  controllerAs: 'ctrl'
});


