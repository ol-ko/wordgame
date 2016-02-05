angular.module("game").controller('GameController', ['$scope', 'Words', 'Score', '$interval', '$location',
	function ($scope, Words, Score, $interval, $location) {

		var wordsPull = [],
			activeWord,
			wordMaxScore,
			removedCharsCounter,
			previousAttemptWordLength;

		$scope.scoreHistory = [];
		$scope.totalScore = 0;
		$scope.wordsGuessed = 0;

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

		// Checks if user has made corrections and/or guessed the word
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
				$scope.wordsGuessed += 1;
				recordWordScore();
				initNewPuzzle();
			}
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

		// Saves user score in a db and redirects user to the highscore table
		$scope.saveHighScore = function () {
			if ($scope.username) {
				Score.add({
					username: $scope.username,
					total: $scope.totalScore,
					totalForSorting: -1 * $scope.totalScore, // hack for desc sorting, Firebase is SO weird
					scoreHistory: $scope.scoreHistory
				}, function () {
					$location.path('/highscore');
				});
			}
		};

		Words.get(
			function (words) {
				if (words.length > 0) {
					wordsPull = shuffleArray(words);

					// Setting interval function to update simple timer and hide game input part when time is up
					$scope.secondsLeft = 40;
					var interval = $interval(function () {
						$scope.secondsLeft -= 1;
						if ($scope.secondsLeft == 0) {
							$interval.cancel(interval);
						}
					}, 1000);

					initNewPuzzle();
				}
			}
		);
	}]
);