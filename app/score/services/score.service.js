angular.module('score').factory('Score', ['$firebaseArray',
	function($firebaseArray) {
		var ref = new Firebase('https://sandbox-wordgame.firebaseio.com/score');

		return $firebaseArray(ref.orderByChild('totalForSorting'));
	}
]);

