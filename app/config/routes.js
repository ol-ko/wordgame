angular.module(appName).config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/words', {
			templateUrl: '/app/words/views/words.view.html',
			controller: 'WordsController'
		}).when('/highscore', {
			templateUrl: '/app/score/views/score.view.html',
			controller: 'ScoreController'
		}).when('/', {
			templateUrl: '/app/game/views/game.view.html',
			controller: 'GameController'
		}).otherwise({
			redirectTo: '/'
		})
	}
]);