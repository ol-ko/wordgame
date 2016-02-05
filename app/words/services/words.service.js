angular.module('words').factory('WordsData', ['$firebaseArray',
	function($firebaseArray) {
		var ref = new Firebase("https://sandbox-wordgame.firebaseio.com/words");

		return $firebaseArray(ref);
	}
]);