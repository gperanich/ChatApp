angular.module('ChatApp', ['ngRoute', 'ngResource', 'ChatApp.controllers', 'ChatApp.directives', 'ChatApp.services', 'ChatApp.factories'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'views/chat.html',
            controller: 'ChatController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .otherwise({
            redirectTo: '/'
        })
}])