angular.module('wordgame').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/words', {
			templateUrl: '/app/words/views/words.view.html',
			controller: 'WordsController'
		}).when('/highscore', {
			templateUrl: '/app/score/views/score.view.html',
			controller: 'ScoreController'
		}).when('/play', {
			templateUrl: '/app/game/views/game.view.html',
			controller: 'GameController'
		}).when('/playagain', {
			redirectTo: '/play'
		}).when('/', {
			templateUrl: '/app/game/views/gamestart.view.html'
		}).otherwise({
			redirectTo: '/'
		})
	}
]);