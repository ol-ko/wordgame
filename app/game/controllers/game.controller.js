angular.module("game").controller('GameController', ['$scope', 'Words',
	function ($scope, Words) {

		var wordsPull = [],
			activeWord,
			wordMaxScore,
			removedCharsCounter,
			previousAttemptWordLength;

		$scope.scoreHistory = [];
		$scope.totalScore = 0;

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

			// init current puzzle
			$scope.attempt = '';
			wordMaxScore = Math.floor(Math.pow(1.95, activeWord.length / 3));
			removedCharsCounter = 0;
			previousAttemptWordLength = 0;
		};

		// Calculates and records word score
		var recordWordScore = function () {
			var wordScore = wordMaxScore - removedCharsCounter;

			wordScore = wordScore < 0 ? 0 : wordScore;

			$scope.totalScore += wordScore;
			$scope.scoreHistory.push({
				word: activeWord,
				score: wordScore,
				max: wordMaxScore,
				corrections: removedCharsCounter
			});
		};

		$scope.handleUserAttempt = function () {
			var attemptLength = $scope.attempt.length;

			// if previous attempt is shorter than current - smth has been deleted
			if (previousAttemptWordLength > attemptLength) {
				removedCharsCounter += 1;
				$scope.removedCharsCounter = removedCharsCounter;
			}

			previousAttemptWordLength = attemptLength;

			// user has guessed
			if ($scope.attempt === activeWord) {
				recordWordScore();
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