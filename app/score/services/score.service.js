angular.module('score').factory('Score', ['$firebaseArray',
	function($firebaseArray) {
		var ref = new Firebase("https://sandbox-wordgame.firebaseio.com/score"),
			Highscore = $firebaseArray(ref.orderByChild('totalForSorting'));

		return {
			list: function (callback) {
				Highscore.$loaded(function (data) {
					callback(data);
				});
			},
			add: function (newEntry, callback) {
				Highscore.$add(newEntry).then(callback);
			}
		}
	}
]);

