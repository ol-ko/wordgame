angular.module(appName).config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/words', {
			templateUrl: '/app/words/views/words.view.html',
			controller: 'WordsController'
		}).when('/', {
			templateUrl: '/app/game/views/game.view.html',
			controller: 'GameController'
		}).otherwise({
			redirectTo: '/'
		})
	}
]);