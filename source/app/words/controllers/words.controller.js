angular.module("words").controller('WordsController', ['$scope', 'WordsData',
	function ($scope, WordsData) {
		$scope.words = WordsData;

		$scope.addWord = function () {
			if ($scope.newWord) {
				$scope.words.$add({
					word: $scope.newWord
				});
				$scope.newWord = '';
			}
		};
	}]
);