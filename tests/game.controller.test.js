describe('GameTest', function () {

	beforeEach(function () {
		angular.mock.module('game');
	});

	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('Puzzle', function () {
		it('Score is calculated correctly', function () {
			var $scope = {};
			var controller = $controller('GameController', {
				$scope: $scope,
				Words: {
					get: function (callback) {
						callback(['pizza']);
					}
				}
			});

			// Imitating user correcting one character before guessing a word
			$scope.attempt = 'pizzi';
			$scope.handleUserAttempt();
			$scope.attempt = 'pizz';
			$scope.handleUserAttempt();
			$scope.attempt = 'pizza';
			$scope.handleUserAttempt();

			expect($scope.scoreHistory[0].score).toBe(2);
		});
	});

});