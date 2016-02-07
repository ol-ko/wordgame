angular.module('words').factory('WordsData', ['$firebaseArray',
	function($firebaseArray) {
		var ref = new Firebase("https://sandbox-wordgame.firebaseio.com/words");

		return $firebaseArray(ref);
	}
]);

angular.module('words').factory('Words', ['WordsData',
	function (WordsData) {
		return {
			get: function (callback) {
				WordsData.$loaded(
					function (data) {
						var wordsArray = [];

						// storing word strings only
						data.forEach(function (wordObj) {
							wordsArray.push(wordObj.word);
						});

						callback(wordsArray);
					},
					function(error) {
						$log.error('Error getting data from Firebase: ', error);
						callback([]);
					}
				);
			}
		}
	}
]);