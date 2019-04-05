angular.module('myApp.rankingService', [])
  .factory('rankingService', function() {
    return {
      save: (setSize, name, turns) => {
        console.log('rankingservice save');
        const ranking = JSON.parse(localStorage.getItem('ranking')) || {};
        ranking[setSize] = ranking[setSize] || [];
        ranking[setSize].push({ name: name, turns: turns });
        ranking[setSize].sort(rank => -rank.turns);
        ranking[setSize] = ranking[setSize].slice(0, 10);
        localStorage.setItem('ranking', JSON.stringify(ranking));
      },
      get: () =>  JSON.parse(localStorage.getItem('ranking')) || {},
    }
  });
