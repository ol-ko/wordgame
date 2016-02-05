angular.module("score").controller('ScoreController', ['$scope', 'Score',
		function ($scope, Score) {
			$scope.score = Score;
		}]
);