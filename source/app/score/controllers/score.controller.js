angular.module("score").controller('ScoreController', ['$scope', 'Score',
	function ($scope, Score) {
		Score.list(function (data) {
			$scope.score = data;
		});
	}]
);