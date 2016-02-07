var appMainModule = angular.module('wordgame', ['ngRoute', 'firebase', 'game']);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['wordgame']);
});