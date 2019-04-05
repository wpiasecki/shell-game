'use strict';

angular.module('myApp.board', ['ngRoute', 'myApp.rankingService', 'ngDialog'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/board/:setSize/:name', {
    templateUrl: 'board/board.html',
    controller: 'BoardCtrl'
  });
}])

.controller('BoardCtrl', ['$scope', '$timeout', 'rankingService', '$routeParams', 'ngDialog', 
    function($scope, $timeout, rankingService, $routeParams, ngDialog) {
  console.log('boardCtrl', this);
  
  const shapes = Object.values({
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
  });
  
  $scope.oneCardFlipped = false;
  $scope.cardFlipped;
  $scope.blockFlipping = false;
  
  $scope.setSize = $routeParams.setSize;
  $scope.playerName = $routeParams.name;
  $scope.turns = 0;

  const set = $scope.setSize == '5set' ? shapes.slice(0, 5) : shapes;
  
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
    //if ($scope.cards.every(card => card.resolved)) {
      //rankingService.save($scope.setSize, $scope.playerName, $scope.turns);
      ngDialog.open({ 
        template: 'board/success.html', 
        className: 'ngdialog-theme-default',
        closeByDocument: false,
        data : {
          playerName: $scope.playerName,
          rounds: $scope.turns,
        }
      });
    //}
  };
  
  $scope.getBorderColor = card => card.flipped ? 'border-color: ' + card.color : '';

}]);

function duplicate(symbols) {
  return [].concat.apply([], symbols.map(symbol => [symbol, symbol]));
}

function randomize(symbols) {

  /*
   * Sorting solution without Math.random()
   * https://osric.com/chris/accidental-developer/2012/07/javascript-array-sort-random-ordering/
   */
  var n = symbols.length;
  var tempArr = [];
  for ( var i = 0; i < n-1; i++ ) {
    // The following line removes one random element from arr
    // and pushes it onto tempArr
    tempArr.push(symbols.splice(Math.floor(Math.random()*symbols.length),1)[0]);
  }
  // Push the remaining item onto tempArr
  tempArr.push(symbols[0]);
  symbols = tempArr;

  return symbols;
}

