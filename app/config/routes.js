angular.module(appName).config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/words', {
			templateUrl: '/app/words/views/words.view.html',
			controller: 'WordsController'
		}).otherwise({
			redirectTo: '/'
		})
	}
]);