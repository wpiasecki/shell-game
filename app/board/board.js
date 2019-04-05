'use strict';

angular.module('myApp.board', ['ngRoute', 'myApp.rankingService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/board', {
    templateUrl: 'board/board.html',
    controller: 'BoardCtrl'
  });
}])

.controller('BoardCtrl', ['$scope', '$timeout', 'rankingService', function($scope, $timeout, rankingService) {
  console.log('boardCtrl', this);
  
  const shapes = {
    star      : ['\u2605', '#d6cf17'],
    hearts    : ['\u2665', '#c42700'],
    clubs     : ['\u2663', 'black'],
    diamond   : ['\u2666', '#8e8e8e'],
    spades    : ['\u2660', '#006172'],
    
    king      : ['\u265A', '#4f0500'],
    note      : ['\u266B', '#5e006b'],
    phone     : ['\u260E', '#4c8901'],
    umbrella  : ['\u2602', '#00004c'],
    horse     : ['\u265E', '#633500'],
  }
  
  const set = [shapes.star, shapes.hearts, shapes.clubs, shapes.diamond, shapes.spades];
  //const set = Object.values(shapes);
  
  $scope.oneCardFlipped = false;
  $scope.cardFlipped;
  $scope.blockFlipping = false;
  
  $scope.setSize = '5';
  $scope.playerName = 'echo';
  $scope.turns = 0;
  
  $scope.cards = randomize(duplicate(set)).map(symbol => (
    { symbol: symbol[0], color: symbol[1], flipped: false, resolved: false }
  ));
  
  $scope.flip = card => {
    if ($scope.blockFlipping || (card == $scope.cardFlipped) || card.resolved) return;
    
    card.flipped = true;
    
    if ($scope.oneCardFlipped) {
      if (card.symbol === $scope.cardFlipped.symbol) {
        $scope.cardFlipped.resolved = true;
        card.resolved = true;
      } else {
        $scope.blockFlipping = true;
        $timeout(() => {
          card.flipped = false;
          $scope.cardFlipped.flipped = false;
          $scope.cardFlipped = null;
          $scope.blockFlipping = false;
        }, 2000);
      }
      $scope.oneCardFlipped = false;
      $scope.turns++;
      $scope.checkGameFinished();
    } else {
      $scope.oneCardFlipped = true;
      $scope.cardFlipped = card;
    }
  };
  
  $scope.checkGameFinished = () => {
    if ($scope.cards.every(card => card.resolved)) {
      console.log('game finished');
      rankingService.save($scope.setSize, $scope.playerName, $scope.turns);
    } else {
      console.log('game not finished');
    }
  };
  
  $scope.getBorderColor = card => card.flipped ? 'border-color: ' + card.color : '';

}]);

function duplicate(symbols) {
  return [].concat.apply([], symbols.map(symbol => [symbol, symbol]));
}

function randomize(symbols) {
  return symbols.sort(() => Math.random() - 0.5);
}

