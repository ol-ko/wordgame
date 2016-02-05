var appName = "wordgame";

var appMainModule = angular.module(appName, ['ngRoute', 'firebase']);

angular.element(document).ready(function () {
	angular.bootstrap(document, [appName]);
});