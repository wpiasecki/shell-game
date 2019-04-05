'use strict';

function HeaderCtrl($scope, $element, $attrs) {
  var ctrl = this;
  console.log('headerCtrl/$scope', ctrl);
}

angular.module('myApp.header', ['ngRoute']).component('header', {
  templateUrl: 'header/header.html',
  bindings: {
    params: '='
  },
  controller: HeaderCtrl,
  controllerAs: 'ctrl'
});


