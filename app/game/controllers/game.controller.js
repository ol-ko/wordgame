angular.module("game").controller('GameController', ['$scope', 'Words',
	function ($scope, Words) {

		var wordsPull = [],
			activeWord;

		// Fisher-Yates array shuffle
		var shuffleArray = function (array) {
			var currentIndex = array.length,
				randomIndex,
				temproraryValue;

			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				temproraryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temproraryValue;
			}
			return array;
		};

		// Shuffling string characters
		var shuffleString = function (inputString) {
			return shuffleArray(inputString.split('')).join('');
		};


		// Initiates a puzzle with a new word
		var initNewPuzzle = function () {
			// getting a first item of randomized words array
			activeWord = wordsPull[0];
			wordsPull.shift();

			// obfuscate word
			$scope.obfuscatedWord = shuffleString(activeWord);

			$scope.attempt = '';
		};

		$scope.handleUserAttempt = function () {
			// user has guessed
			if ($scope.attempt === activeWord) {
				// TODO: record score
				initNewPuzzle();
			}
		};

		Words.get(
			function (words) {
				if (words.length > 0) {
					wordsPull = shuffleArray(words);
					initNewPuzzle();
				}
			}
		);
	}]
);